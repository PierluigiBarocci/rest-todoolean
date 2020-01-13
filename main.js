$(document).ready(function(){

    var my_personal_url = 'http://157.230.17.132:3001/todos';

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
    // Nome repo: rest-todoolean
    // Creare una piccola applicazione web per gestire una lista di "todo". Le operazioni principali che devo essere implementate sono:
    // la lettura di tutti i todo
    // l'inserimento di un nuovo todo
    // la cancellazione di un todo.
    // BONUS: gestire la modifica di un todo.





})
