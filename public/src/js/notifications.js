// function notificationRoute() {
//     fetch('/notifications')
//     .then(response => {
//         console.log(response);
//         if(response.redirected) {
//             window.location.href = response.url;
//         }
//         else {
//             if(response.ok) {
//                 response.json()
//                 .then(res => {
//                    renderNotifications(res);
//                 })
//             }
//         }
//     })
// }
// function renderNotifications(response) {
//     for(let i = response.length - 1;i>=0;i--) {
        
//         let notif = document.querySelector('.notif').cloneNode(true);
//         console.log(notif);
//         notif.textContent = response[i].message;
//         document.getElementById('notifs').appendChild(notif);
        
        
//     }
// }
// notificationRoute();