<!--New images on load -->
var images = ['1f404.svg', '1f31d.svg', '1f31e.svg', '1f404.svg', '1f40b.svg', '1f68c.svg', '1f69b.svg', '1f6b4.svg'];
$('<img id="titleEmoji" src=images/' + images[Math.floor(Math.random() * images.length)] + '>').appendTo('#title');

$(document).ready(function () {

    for (var i = 1; i < 6; i++) {
        var target = '.growAnimation' + i;
        jQuery(target).viewportChecker({
            classToAdd: 'animated',
            offset: 10
        });
    }


    $('.form_error').hide();
    $('#fireworks').hide();
    $('#loader').hide();
    $('#subscribeButton').click(function () {
        var name = $('#nameField').val();
        var $emailField = $("#emailField");
        var email = $emailField.val();
        var $invalidEmail = $("#invalid_email");
        var $email = $('#email');
        if (email === '') {
            $email.next().show();
            $invalidEmail.text("sorry, but we can't subscribe you to the email list without an email :c");
            $emailField.css('border-color', "red")
            $invalidEmail.show();
            return false;
        }
        if (IsEmail(email) === false) {
            $email.next().show();
            $invalidEmail.text("You sure that's a valid email? The computer thinks it looks a little off...");
            $emailField.css('border-color', "red")
            $invalidEmail.show();
            return false;
        }
        var data = JSON.stringify({
            "captchaResponse": grecaptcha.getResponse(),
            "email": email
        });

        $('#loader').show();
        console.log(data);
        //ajax call php page
        $.post("https://er778qqu6h.execute-api.us-east-1.amazonaws.com/dev/subscribe", data, function (response) {
            $('#loader').hide();
            $('#fireworks').show();
        }, "json");
        return false;
    });

    $("#emailField").bind('input',function () {
        $("#invalid_email").hide();
        $("#emailField").css('border-color', "")
    });
});
function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}
