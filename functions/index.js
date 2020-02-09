const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();


exports.deleteUser = functions.https.onCall((data,context)=>{
    return admin.auth().getUserByEmail(data.email)
    .then(user =>{
        return admin.auth().deleteUser(user.uid)
            .then(function(){})
            .catch(function(error) {
                console.log('Error deleting user:', error);
            });
    })
    .then((res)=>{
        return {
            message:"user deleted"
        };
        // return res;
    })
    .catch(err => {
        return err;
    });
});

exports.getuserrole = functions.https.onCall((data,context)=>{
    return admin.auth().getUserByEmail(data.email)
    .then((user)=>{
        return user.customClaims.admin ? 'admin' : user.customClaims.faculty ? 'faculty': null;
    })
    .then((res)=>{
        return res;
    })
    .catch((err)=>{
        return err;
    });
});

exports.addAdminRole = functions.https.onCall((data, context) => {
    return admin.auth().getUserByEmail(data.email)
    .then(user =>{
        return admin.auth().setCustomUserClaims(user.uid,{
            admin:true
        });
    })
    .then(()=>{
        return {
            message:`success! ${data.email} has been made an admin`
        }
    })
    .catch(err => {
        return err;
    });
});

exports.addFacultyRole = functions.https.onCall((data, context) => {
    return admin.auth().getUserByEmail(data.email)
    .then(user =>{
        return admin.auth().setCustomUserClaims(user.uid,{
            faculty:true
        });
    })
    .then((res)=>{
        return {
            message: `success! ${data.email} has been made an Faculty`
        }
    })
    .catch(err => {
        return err;
    });
});

// exports.setFacultyRole = functions.https.onCall((data, context) => {
//     return admin.auth().getUserByEmail(data.email)
//         .then(user =>{
//             user.getIdTokenResult()
//                 .then(id=>{
//                     admin.auth().setCustomUserClaims(user.uid,{
//                         admin:id.claims.admin,
//                         faculty:true
//                     })
//                     .then(()=>{
//                         return {
//                             message: `success! ${data.email} has been made an Faculty`
//                             // message:res
//                         }
//                     });
//                     // return id.claims.admin;
//                 })
//                 .then((res)=>{
//                     return res;
//                 })
//                 .catch(err => {
//                     return err;
//                 });
//             // return user;
//         })
//         .then((res)=>{
//             return res;
//         })
//         .catch(err => {
//             return err;
//         });
// });