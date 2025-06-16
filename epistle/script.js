const local_dev_cors_message = `<br><br><strong>Possible Fixes:</strong><br>This might be a problem with <i>CORS</i> policy, to fix please host the website on any hosting software like <a href="https://vercel.com/" target="_blank">Vercel</a>, Github Pages, <a href="https://cloudflare.com/" target="_blank">Cloudflare Pages</a> etc.`;

// markdown it on top (real)
function loadMessage(md) {
    const message = document.querySelector("#message");

    fetch("message.txt")
        .then(response => response.text())
        .then(data => {
            message.innerHTML = md.render(data);
        })
        .catch(error => {
            if (document.location.hostname === "localhost" || document.location.href.startsWith("file://")) {
                message.innerHTML = `An error occurred while fetching the message. <code>${error}</code>${local_dev_cors_message}`;
                return;
            }

            message.innerHTML = `An error occurred while fetching the message. <code>${error}</code>`;
        });
}

function launchConfettiFlowers() {
    const confettiCount = 30;
    const container = document.body;
    const emojis = ['💙', '🌸', '💠', '🌼']; // blue-ish flowers and hearts

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('span');
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-2vh';
        confetti.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = 9999;
        confetti.style.transition = 'transform 2.5s ease, opacity 2.5s';

        // Random rotation
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

        container.appendChild(confetti);

        setTimeout(() => {
            confetti.style.transform += ` translateY(${80 + Math.random() * 10}vh)`;
            confetti.style.opacity = 0;
        }, 50);

        setTimeout(() => {
            confetti.remove();
        }, 2600);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let tempdata = {
        "did_open": false
    }

    const heart = document.querySelector("#solid-heart");

    const msg_container = document.querySelector("#message-container");

    const md = window.markdownit({html: true});

    loadMessage(md);

    heart.addEventListener("click", function() {
    if (tempdata.did_open) {
        return;
    }
    tempdata.did_open = true;

    msg_container.classList.remove("hidden");
    msg_container.classList.add("flex");

    let auto_css_height = msg_container.scrollHeight + 20; // 20 extra padding
    msg_container.classList.remove("h-0");
    // Set height directly via style for dynamic value
    msg_container.style.height = `${auto_css_height}px`;

    // Launch confetti flowers
    launchConfettiFlowers();

    setTimeout(() => {
        if (msg_container.scrollHeight > msg_container.clientHeight) {
            msg_container.classList.remove("overflow-y-hidden");
            msg_container.classList.add("overflow-y-scroll");
        }

        window.onresize = function() {
            if (msg_container.scrollHeight > msg_container.clientHeight) {
                msg_container.classList.remove("overflow-y-hidden");
                msg_container.classList.add("overflow-y-scroll");
            } else {
                msg_container.classList.remove("overflow-y-scroll");
                msg_container.classList.add("overflow-y-hidden");
            }

            // Update height dynamically
            auto_css_height = msg_container.scrollHeight + 20;
            msg_container.style.height = `${auto_css_height}px`;
        }
    }, 1450);
});

});