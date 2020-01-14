$(document).ready(function(){

    var my_personal_url = 'http://157.230.17.132:3001/todos/';

    var template_html = $("#todo-template").html();
    var template_function = Handlebars.compile(template_html);

    getting_list();

    $('#add-button').click(function(){
        var added_item = $('#user-input').val().trim();
        if (added_item.length) {
            adding_element(added_item);
        } else {
            alert('Devi scrivere qualcosa da aggiungere');
        };
        $('#user-input').val('');
    });

    $('#todo-list').on('click', '.delete.show', function(){
        var card_father = $(this).parent();
        var current_id = card_father.attr('data-todo_id');
        deleting_element(current_id);
    });

    $('#todo-list').on('click', '.edit.show', function(){
        var card_father = $(this).parent();
        $('.edit-item').addClass('hide');
        $('.todo-text').removeClass('hide');
        $('i.save').removeClass('show').addClass('hide');
        $('i.edit').removeClass('hide').addClass('show');
        $(this).removeClass('show').addClass('hide');
        card_father.find('i.save').removeClass('hide').addClass('show');
        card_father.find('.todo-text').addClass('hide');
        card_father.find('.edit-item').removeClass('hide');
    });

    $('#todo-list').on('click', '.save.show', function(){
        var card_father = $(this).parent();
        var current_id = card_father.attr('data-todo_id');
        var updated_value = card_father.find('.edit-item').val().trim();
        if (updated_value.length) {
            update_element(current_id, updated_value);
        } else {
            getting_list();
        }
    });

    // CRUD Functions


    // Read Function

    function getting_list() {
        $.ajax({
            'url': my_personal_url,
            'method': 'GET',
            'success': function(data) {
                $('#todo-list').empty();
                for (var i = 0; i < data.length; i++) {
                    var todo_item = data[i].text;
                    var todo_id = data[i].id;
                    var properties = {
                        'todo-text': todo_item,
                        'todo-id': todo_id
                    };
                    var final = template_function(properties);
                    $('#todo-list').append(final);
                }
            },
            'error': function() {
                alert('errore');
            }
        });
    }

    // Create Function

    function adding_element(element) {
        $.ajax({
            'url': my_personal_url,
            'method': 'POST',
            'data': {
                'text': element
            },
            'success': function(data) {
                getting_list();
            },
            'error': function() {
                alert('errore');
            }
        });
    }

    // Delete Function

    function deleting_element(id) {
        $.ajax({
            'url': my_personal_url + id,
            'method': 'DELETE',
            'success': function(data) {
                getting_list();
            },
            'error': function() {
                alert('errore');
            }
        });
    }

    // Update Function

    function update_element(id, element) {
        $.ajax({
            'url': my_personal_url + id,
            'method': 'PUT',
            'data': {
                'text': element
            },
            'success': function(data) {
                getting_list();
            },
            'error': function() {
                alert('errore');
            }
        });
    }

})
