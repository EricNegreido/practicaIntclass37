document.addEventListener('DOMContentLoaded', function () {
    const buyButton = document.getElementById('buyButton');

    if (buyButton) {
        buyButton.addEventListener('click', async function () {

            const amount = buyButton.getAttribute('data-amount');
            const purchaser = buyButton.getAttribute('data-purchaser');

            const ticketResponse = await fetch('/api/ticket/generateTicket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount, purchaser }),
            })
            const ticketData = await ticketResponse.json();
            if(ticketResponse){
                await fetch('/api/mail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content: ticketData.html, email: purchaser }),
                });
            }
        });
    }
});