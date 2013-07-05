$(function () {
    checkTitle();

    $('#title-editor').focus(function () { $('#title-prompt-text').hide(); });
    $('#title-editor').focusout(function () {
        checkTitle();
    });

    function checkTitle() {
        if ($.trim($('#title-editor').val()).length == 0) {
            $('#title-editor').val('');
            $('#title-prompt-text').show();
        }
        else { $('#title-prompt-text').hide(); }
    }

    //  Confirm window close
    var needToConfirm = true;
    window.onbeforeunload = confirmExit;
    function confirmExit() {
        if (needToConfirm) {

            return 'You have attempted to leave this page.  If you have made any changes to the fields without clicking the Save button, your changes will be lost.'
        }
    }


    // TinyMCE init
    $('#content-editor').tinymce({
        // Location of TinyMCE script
        script_url: '/assets/js/tiny_mce/tiny_mce.js',

        // General options
        theme: "advanced",
        plugins: "autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist",
        content_css: "/assets/css/main.css",
        gecko_spellcheck: true,

        // Theme options
        theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,bullist,numlist,|,link,unlink,anchor,image,cleanup,help,code,|,forecolor,backcolor,|,charmap,iespell,media,",
        theme_advanced_buttons2: "pasteword,|,search,replace,|,outdent,indent,blockquote,|,undo,redo,|,fullscreen",
        theme_advanced_buttons3: "",

        theme_advanced_toolbar_location: "top",
        theme_advanced_toolbar_align: "left",
        theme_advanced_statusbar_location: "bottom",
        theme_advanced_resizing: true,
        theme_advanced_resize_horizontal: false,

        // Drop lists for link/image/media/template dialogs
        template_external_list_url: "lists/template_list.js",
        external_link_list_url: "lists/link_list.js",
        external_image_list_url: "lists/image_list.js",
        media_external_list_url: "lists/media_list.js",

        // Replace values for the template plugin
        template_replace_values: {
            username: "Some User",
            staffid: "991234"
        },
        setup: function (ed) {
            ed.onChange.add(function (ed, e) {
                updateTextContent();
            });
            ed.onKeyUp.add(function (ed, e) {
                updateTextContent();
            });
        }
    });

    //localstorage
    var blog = {};

    function updateTextContent() {
        blog.content = $('#content-editor').tinymce().getContent();
        localStorage['UNIQUE#' + sessionID] = JSON.stringify(blog);
    }
    $('#title-editor').keyup(function () {
        blog.title = $('#title-editor').val();
        localStorage['UNIQUE#' + sessionID] = JSON.stringify(blog);
    });

    // Open preview window with proper GUID reference
    $('#previewOpen').click(function (e) {
        e.preventDefault();
        if ($('#title-editor').val() == '') { alert('Please enter a title') }
        else {
            window.open('/Preview#' + sessionID, "previewWindow", "width=1024,height=800");
        }
    });

    // GUID Generator

    var sessionID = guid();

    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    function guid() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

});