(function () {

    //Create a modal, which contains an array to hold list of todos
    var modal = {
        init: function () {
            this.todolist = [];
            this.todolist = JSON.parse(localStorage.getItem("tododata"));
            if (this.todolist === null)
                this.todolist = [];
        },
        getTodoList: function () {
            return this.todolist;
        },
        setTodoState: function (intodoid) {
            //Set status
            this.todolist[intodoid].status === "closed" ?
                this.todolist[intodoid].status = "open" : this.todolist[intodoid].status = "closed";
            localStorage.setItem("tododata", JSON.stringify(this.todolist));
        },
        setNewTodo: function (inval) {
            this.todolist.push({
                id: this.todolist.length,
                name: inval,
                status: "open"
            });
            localStorage.setItem("tododata", JSON.stringify(this.todolist));
            this.myFirebaseRef.push({id: this.todolist.length, name: inval, status: "open"});
        },
        clearall: function () {
            this.todolist = [];
        }
    }

    //Create a View, which interacts with Controller and alters the display in HTML
    var view = {
        init: function () {
            this.todolst = $('#todolistelm');
            this.todolst.html(' ');
            view.render();
            $('#clearall').click(function () {
                localStorage.clear();
                controller.clearall();
                view.render();
            });
        },
        render: function () {
            var htmlStr = '';
            var clr = true;
            var todoelem = $('#todolistelm');
            todoelem.html('');

            if (controller.getTodoList().length === 0) {
                $("#cleanmsg").css("visibility", "visible");
                $("#displaysection").css("visibility", "hidden")
            } else {
                $("#cleanmsg").css("visibility", "hidden");
                $("#displaysection").css("visibility", "visible")
            }

            controller.getTodoList().forEach(function (todo) {
                //DOM elements

                var elemId = ' ';
                var lielem = $('<li></li>');
                var spanelem = $('<span></span>');
                var taskid = "#task" + todo.id;

                //Create <li> element and add required classes
                lielem.addClass("list-group-item");
                //Set status of the todo item
                todo.status === "closed" ? lielem.addClass("completed") : lielem.addClass("");
                //Set alternate color
                clr === true ? lielem.addClass("colored") : lielem.addClass("");
                clr = !clr;

                //Create <span> and add required classes and IDs
                spanelem.addClass("glyphicon");
                spanelem.addClass("glyphicon-ok pull-right");
                spanelem.addClass("todocomplete");
                spanelem.attr('id', "task" + todo.id);

                //Append span and name to <li>
                lielem.append(spanelem);
                lielem.append(todo.name);

                //Append <li> to main list
                $(todoelem).append(lielem);

                //Add event handlers
                $(taskid).click(function (todoid) {
                    return function () {
                        controller.setTodoState(todoid);
                        view.render();
                    };
                }(todo.id));
            });

            //Set focus on input textbox by default
            $('#intodo').focus();
        }
    };

    //Create a controller, which acts as a mediator between View and Modal
    var controller = {
        init: function () {
            //Initialize view and modal
            modal.init();
            view.init();
        },
        getTodoList: function () {
            return modal.getTodoList();
        },
        setTodoState: function (intodoid) {
            modal.setTodoState(intodoid);
        },
        setNewTodo: function (inval) {
            modal.setNewTodo(inval);
        },
        clearall: function () {
            modal.clearall();
        }
    };

    //Set ENTER key on the input text box
    $('#intodo').keypress(function (e) {
        if (((e.which && e.which == 13) ||
                (e.keyCode && e.KeyCode == 13)) &&
            $("#intodo").val().trim().length > 0) {
            controller.setNewTodo($("#intodo").val());
            view.render();
            $("#intodo").val('');
        }
    });

    //Set the controller to start the work
    controller.init();
})();