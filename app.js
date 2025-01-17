document.addEventListener('DOMContentLoaded', function() {
    const leaveForm = document.getElementById('leaveForm');
    
    leaveForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(leaveForm);
        const leaveRequest = {
            user_name: formData.get('name'),
            user_email: formData.get('email'),
            leaveType: formData.get('leaveType'),
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate'),
            reason: formData.get('reason'),
            contact_number: Math.floor(Math.random() * 10000), // Generate a random contact number
            message: `Leave Type: ${formData.get('leaveType')}
                      Start Date: ${formData.get('startDate')}
                      End Date: ${formData.get('endDate')}
                      Reason: ${formData.get('reason')}`
        };

        if (validateLeaveRequest(leaveRequest)) {
            sendLeaveRequest(leaveRequest);
        } else {
            alert('Please fill in all fields correctly.');
        }
    });

    function validateLeaveRequest(request) {
        return request.user_name && request.user_email && request.leaveType && request.startDate && request.endDate && request.reason;
    }

    function sendLeaveRequest(request) {
        emailjs.send('service_8lsqyk5', 'template_anegvij', request, '75kTFnQ82JSZG-FPt')
        .then(response => {
            console.log('SUCCESS!', response.status, response.text);
            alert('Leave request submitted successfully!');
            leaveForm.reset();
        })
        .catch(error => {
            console.error('FAILED...', error);
            console.error('Error details:', error);
            alert('There was an error submitting your request. Please try again later.');
        });
    }
});