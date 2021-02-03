const userId = document.getElementById('userId');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const removeBtn = document.getElementById('removeBtn'); 

const database = firebase.database();
const usersRef = database.ref('/users');

// Add elements to the database
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // const autoId = usersRef.push().key
    usersRef.child(userId.value).set({
        first_name: firstName.value,
        last_name: lastName.value,
        age: age.value
    });
});

// Update elements from the database
updateBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    const newData ={
        first_name: firstName.value,
        last_name: lastName.value, 
        age: age.value
    };
    usersRef.child(userId.value).update(newData);
});

// Remove elements from the database
removeBtn.addEventListener('click', e =>{
    e.preventDefault();
    usersRef.child(userId.value).remove()
    .then(() => {
        window.alert('user removed from database !');
    })
    .catch(error => {
        console.error(error);
    });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

});

// Add events to read input data and send messages to the console
//  snapshot.val()
usersRef.on('child_added', snapshot => {
    console.log('Child(s) added !');
});

usersRef.on('child_removed', snapshot => {
    console.log('Child(s) removed!');
});

usersRef.on('child_changed', snapshot => {
    console.log('Child(s) changed!');
});

// Do queries in the database. A query is composed of a reference, 
// an ordering function and a querying function.

//usersRef.orderByKey().limitToLast(2).on('value', snapshot => {
//    console.log(snapshot.val());
//});

//usersRef.orderByChild('age').limitToLast(2).on('value', snapshot => {
//    console.log(snapshot.val());
//});

usersRef.orderByChild('age').equalTo('30').on('value', snapshot => {
    console.log(snapshot.val());
});