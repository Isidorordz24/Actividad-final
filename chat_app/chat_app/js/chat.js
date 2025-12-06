$(function(){
    let channel = { type: "global" };

    function loadUsers(){
        $.get("php/api_get_users.php", function(html){
            $("#users-list").html(html);
        });
    }

    function loadGroups(){
        $.get("php/api_load_groups.php", function(html){
            $("#groups-list").html(html);
            let prev = $("#channel-select").val();
            $("#channel-select").find("option[data-group]").remove();
            $("#groups-list").find(".group-item").each(function(){
                const id = $(this).data("id");
                const name = $(this).text();
                $("#channel-select").append(`<option data-group="1" value="group:${id}">Grupo: ${name}</option>`);
            });
            $("#channel-select").val(prev);
        });
    }

    function loadMessages(){
        let q = { type: channel.type };
        if (channel.type === "private") q.with = channel.id;
        if (channel.type === "group") q.group_id = channel.id;

        $("#chat").load("php/api_load_messages.php", q, function(){
            $("#chat").scrollTop($("#chat")[0].scrollHeight);
        });
    }

    $("#send").on("click", function(){
        let msg = $("#msg").val().trim();
        if (!msg) return;
        let data = { type: channel.type, msg: msg };
        if (channel.type === "private") data.to_id = channel.id;
        if (channel.type === "group") data.group_id = channel.id;

        $.post("php/api_send_message.php", data, function(resp){
            $("#msg").val("");
            loadMessages();
        }, "json").fail(function(){
            alert("Error al enviar");
        });
    });

    $(document).on("click", ".user-item", function(){
        const id = $(this).data("id");
        const name = $(this).text();
        channel = { type: "private", id: id };
        $("#channel-select").find("option[value='private:"+id+"']").remove();
        $("#channel-select").append(`<option value="private:${id}">Privado: ${name}</option>`);
        $("#channel-select").val("private:"+id);
        loadMessages();
    });

    $(document).on("click", ".join-group", function(){
        const id = $(this).data("id");
        $.post("php/api_join_group.php", { group_id: id }, function(){
            loadGroups();
        });
    });

    $("#channel-select").on("change", function(){
        const val = $(this).val();
        if (val === "global") {
            channel = { type: "global" };
        } else if (val.startsWith("private:")) {
            channel = { type: "private", id: val.split(":")[1] };
        } else if (val.startsWith("group:")) {
            channel = { type: "group", id: val.split(":")[1] };
        }
        loadMessages();
    });

    $("#create-group-form").on("submit", function(e){
        e.preventDefault();
        const name = $("#group-name").val().trim();
        if (!name) return;
        $.post("php/api_create_group.php", { name: name }, function(){
            $("#group-name").val("");
            loadGroups();
        });
    });

    // inicial
    loadUsers();
    loadGroups();
    loadMessages();
    setInterval(loadUsers, 5000);
    setInterval(loadGroups, 5000);
    setInterval(loadMessages, 1000);
});
