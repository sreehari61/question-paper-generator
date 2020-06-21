function draganddrop(){
    $( "#drag-main" ).draggable({
        // revert: true,
        containment: $('#main-paper-container'),
        appendTo: 'body',
        helper: 'clone',
        start: function() {
            console.log('dragStart')
        },
    });
    $( "#drag-section" ).draggable({
        // revert: true,
        containment: $('#drag-Container-main'),
        appendTo: 'body',
        helper: 'clone',
        start: function() {
            console.log('dragStart')
        },
    });
    $( "#main-paper-container" ).droppable({
        drop: function( event, ui ) {
            console.log(ui)
            $('#main-paper-container').html(`
                <div class="drag-Container-main" id="drag-Container-main">
                    <div class="title">
                        <span>Main</span>&emsp;&emsp;
                        <span class="delete" id="maindelete" onclick="remove('main-paper-container')">X</span>
                    </div>
                </div>
            `)
        },
        accept: "#drag-main",
    });
    $( "#drag-Container-main" ).droppable({
        drop: function( event, ui ) {
            console.log(event)
            $('#drag-Container-main').append(`
                <div class="drag-section-main" id="drag-section-main" >
                    <div class="title">
                        <span>Section</span>&emsp;&emsp;
                        <span class="delete" id="maindelete">X</span>
                    </div>
                </div>
            `)
        },
        // accept: "#drag-section",
    });
}

function remove(id){
    $(`#${id}`).empty()
}