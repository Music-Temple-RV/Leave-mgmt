document.addEventListener('DOMContentLoaded', function() {
    const leaveForm = document.getElementById('leaveForm');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const daysRequiredInput = document.getElementById('daysRequired');

    startDateInput.addEventListener('change', calculateDaysRequired);
    endDateInput.addEventListener('change', calculateDaysRequired);

    leaveForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(leaveForm);
        const leaveRequest = {
            user_name: formData.get('name'),
            user_email: formData.get('email'),
            leaveType: formData.get('leaveType'),
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate'),
            daysRequired: formData.get('daysRequired'),
            reason: formData.get('reason'),
            contact_number: Math.floor(Math.random() * 10000), // Generate a random contact number
            message: `Leave Type: ${formData.get('leaveType')}
                      Start Date: ${formData.get('startDate')}
                      End Date: ${formData.get('endDate')}
                      Number of Days: ${formData.get('daysRequired')}
                      Reason: ${formData.get('reason')}`
        };

        if (validateLeaveRequest(leaveRequest)) {
            sendLeaveRequest(leaveRequest);
        } else {
            alert('Please fill in all fields correctly.');
        }
    });

    function calculateDaysRequired() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        if (startDate && endDate && endDate >= startDate) {
            const timeDiff = endDate - startDate;
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1; // Including both start and end date
            daysRequiredInput.value = daysDiff;
        } else {
            daysRequiredInput.value = '';
        }
    }

    function validateLeaveRequest(request) {
        return request.user_name && request.user_email && request.leaveType && request.startDate && request.endDate && request.reason && request.daysRequired;
    }

    function sendLeaveRequest(request) {
        emailjs.send('service_8lsqyk5', 'template_anegvij', request, '75kTFnQ82JSZG-FPt')
        .then(response => {
            console.log('SUCCESS!', response.status, response.text);
            alert('Leave request submitted successfully!');
            leaveForm.reset();
            daysRequiredInput.value = ''; // Reset days required field
        })
        .catch(error => {
            console.error('FAILED...', error);
            console.error('Error details:', error);
            alert('There was an error submitting your request. Please try again later.');
        });
    }
});