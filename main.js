<!--New images on load -->
var images = ['1f1fa-1f1f8.svg', '1f31e.svg', '1f354.svg', '1f363.svg', '1f402.svg', '1f404.svg', '1f406.svg', '1f40a.svg',
    '1f410.svg', '1f466.svg', '1f468.svg', '1f472.svg', '1f5ff.svg', '1f69b.svg', '1f6b4.svg', '1f31d.svg',
    '1f344.svg', '1f355.svg', '1f38e.svg', '1f403.svg', '1f405.svg', '1f407.svg', '1f40b.svg', '1f419.svg', '1f467.svg',
    '1f46f.svg', '1f479.svg', '1f47e.svg', '1f68c.svg', '1f69e.svg', '1f6b6.svg'];
$('<img id="titleEmoji" src=images/twemoji/' + images[Math.floor(Math.random() * images.length)] + '>').appendTo('#title');

$(document).ready(function () {
    $("#city").load("city.html", function () {
            for (var i = 1; i < 6; i++) {
                var target = '.growAnimation' + i;
                jQuery(target).viewportChecker({
                    classToAdd: 'animated',
                    offset: 10
                });
            }
            $(".soc").load("socialMedia.html")
        }
    );

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
            $emailField.css('border-color', "red");
            $invalidEmail.css('color', "orange");
            $invalidEmail.show();
            return false;
        }

        if (IsEmail(email) === false) {
            $email.next().show();
            $invalidEmail.text("You sure that's a valid email? The computer thinks it looks a little off...");
            $emailField.css('border-color', "red");
            $invalidEmail.css('color', "orange");
            $invalidEmail.show();
            return false;
        }

        // var captchaResponse = grecaptcha.getResponse();
        //
        // if (captchaResponse ==='') {
        //     $email.next().show();
        //     $invalidEmail.text("Please complete the captcha below to help protect us from bots!");
        //     $emailField.css('border-color', "orange");
        //     $invalidEmail.css('color', "yellow");
        //     $invalidEmail.show();
        //     return false;
        // }

        var data = JSON.stringify({
            // "captchaResponse": captchaResponse,
            "email": email
        });

        $invalidEmail.hide();
        $('#loader').show();
        console.log(data);
        //ajax call php page
        $.post("https://er778qqu6h.execute-api.us-east-1.amazonaws.com/dev/subscribe", data, function (response) {
            console.log(response);
            if (response.success) {
                $invalidEmail.text(response.message);
                $invalidEmail.css('color', "#e6fdf1");
                $invalidEmail.show();
                if (response.message.startsWith("We just sent you")) {
                    $('#fireworks').show();
                }
            }
            $('#loader').hide();
        }, "json");
        return false;
    });

    $("#emailField").bind('input', function () {
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
