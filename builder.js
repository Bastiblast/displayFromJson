function ActivePicker(id, login, fullName) {
    const picker = {
        id: id,
        login: login,
        fullName: fullName,
        roster: [], // Initially empty array
        rosterEmployeeRow: [], // Initially empty array
        tenure: undefined
    };

    // Function to update the rosterEmployeeRow based on id
    function updateRosterEmployeeRow() {
        picker.rosterEmployeeRow = picker.roster.filter(row => picker.id === row.employeeId);
        // Assuming each row has a 'tenure' property
        if (picker.rosterEmployeeRow.length > 0) {
            picker.tenure = picker.rosterEmployeeRow[0].tenure;
        }
    }

    // You can expose the updateRosterEmployeeRow method if needed, or just call it internally
    updateRosterEmployeeRow();

    return picker;
}