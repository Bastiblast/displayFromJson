class ActivePicker {

    constructor() {
        this.id = id
        this.login = login
        this.fullName = fullName
    }

// Utilisation du tableau roster pour agrémenter le profil Picker
    roster = [] 

// Utilisation de la ligne où se trouve les informations du picker.
    rosterEmployeeRow = [] 

// Recherche de la ligne en fonction du picker id.
    rosterEmployeeRow = this.roster.filter(row => (this.id === row.employeeId)) 

// Initialisation du tenure avec la ligne dans la rosterEmployeeRow.
    tenure = this.rosterEmployeeRow.tenure

}