const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: "Expo.easeInOut"
    })
        .to(".boundingelem",{
            y: 0,
            ease: 'Expo.easeInOut',
            duration: 2,
            delay: -1,
            stagger: .2
        })
        .from("#herofooter",{
            y: '-10',
            duration: 1.5,
            opacity: 0,
            delay: -1,
            ease: 'Expo.easeInOut'
        })
}

function circleChaptaKaro() {
    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets) {
        var yscale = gsap.utils.clamp(0.8, 1.2, (dets.clientY - yprev) * 0.2);
        var xscale = gsap.utils.clamp(0.8, 1.2, (dets.clientX - xprev) * 0.2);

        xprev = dets.clientX;
        yprev = dets.clientY;

        // Animate scale on mouse move
        gsap.to("#minicircle", {
            x: dets.clientX,
            y: dets.clientY,
            scaleX: xscale,
            scaleY: yscale,
            duration: 0.2,
            ease: "power2.out"
        });

        // Animate reset back to normal smoothly
        gsap.to("#minicircle", {
            scaleX: 1,
            scaleY: 1,
            delay: 0.1,  // small delay after movement
            duration: 0.3,
            ease: "power2.out"
        });
    });
}
circleChaptaKaro();

circleChaptaKaro();

function cicrleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

cicrleMouseFollower();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function(elem) {
    let prevX = 0;

    elem.addEventListener("mousemove", function(dets) {
        var bounds = elem.getBoundingClientRect();
        var diffY = dets.clientY - bounds.top;
        var diffX = dets.clientX - bounds.left;

        // Calculate horizontal movement
        let deltaX = dets.clientX - prevX;
        prevX = dets.clientX;

        // Convert to rotation angle (bigger, smoother)
        let rotation = gsap.utils.clamp(-20, 20, deltaX * 1.2);

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: "power3.out",
            top: diffY,
            left: diffX,
            rotation: rotation,
            duration: 0.9   // 👈 smoother transition
        });
    });

    elem.addEventListener("mouseleave", function() {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            rotation: 0,   // reset to straight
            duration: 1,
            ease: "power3.out"
        });
    });
});
