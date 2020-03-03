var db = firebase.firestore();

async function getquestions(branch,sem,scheme,subject,exam,marks){
    if(exam == "first"){
        var s = 1;
        var e = 3;
        var returnquestion = [];
        if(marks == 1){
            for(let i=s; i < e+1; i++){
                var a = db.doc(`${branch}/${sem}/${scheme}/${subject}/unit${i}/2marks`);
                        // .collection('/cse/sem1/scheme17')
                        // a.collection('2marks').doc('who found firebase').set({});
                returnquestion.push(await getquestionsfromdb(a,marks));
                
                // console.log(returnquestion);
            }
        }else if(marks == 2){
            var z = [3,4,5,8];
            for(let i=s; i < e+1; i++){
                var x = z[Math.floor((Math.random() * 4) + 1)];
                var c = 8-x;
                console.log(x+" , "+c);
                var a = db.doc(`${branch}/${sem}/${scheme}/${subject}/unit${i}/4marks`);
                        // a.collection('2marks').doc('who found firebase').set({});
                if(a){
                    returnquestion.push(await getquestionsfromdb(a,marks));
                }else{
                    console.log("error");
                }
                // console.log(returnquestion);
            }
        }
    }else if(exam == "second"){
        var s = 3;
        var e = 5;
        var returnquestion = [];
        for(let i=s; i < e+1; i++){
            var a = db.doc(`branch/${branch}/${sem}/${scheme}/unit${i}/${i}marks`);
                    // a.collection('2marks').doc('who found firebase').set({});
            returnquestion.push(await getquestionsfromdb(a,sec));
            console.log(returnquestion);
        }
    }else if(exam == "end"){
        var a = db.doc(`branch/${branch}/${sem}/${scheme}/unit${i}/${marks}marks`);
        var returnquestion = "";
                // a.collection('2marks').doc('who found firebase').set({});
        var returnquestion = await getquestionsfromdb(a,sec)
        console.log(returnquestion);
    }
    return returnquestion;
}

async function getquestionsfromdb(a,sec){
    return a.get().then(function(doc){
        var data = doc.data();
        if(data){
            var c = data[Object.keys(data)[0]]
            let q = sec == 1 ? get2marksquestion(data,c) : get4question(data,c);
            // console.log(q);
            return q;
        }
        else{
            return "no data";
        }
    }); 
}

function get2marksquestion(questions,c){
    var x = Math.floor((Math.random() * c) + 1);
    var key = Object.keys(questions)[x];
    var value = questions[key];
    return value;
}

function get4question(questions,c){
    var w = Math.floor((Math.random() * c) + 1);
    var value = [];
    var key;
    while(true){
        var x = Math.floor((Math.random() * c) + 1);
        var y = Math.floor((Math.random() * c) + 1);
        var z = Math.floor((Math.random() * c) + 1);
        if(w != x && w != y && w != z && x != y && x != z && y != z){
            key = Object.keys(questions)[w];
            value.push(questions[key]);
            key = Object.keys(questions)[x];
            value.push(questions[key]);
            key = Object.keys(questions)[y];
            value.push(questions[key]);
            key = Object.keys(questions)[z];
            value.push(questions[key]);
            break;
        }
    }
    return value;
}



async function getsubjects(degree,branch,sem,scheme){
    var items;
    var a = db.collection(`${degree}/${branch}/${scheme}/${sem}/subjects`);
    items = await getsubjectsid(a);
    return items;
}

function getsubjectsid(a){
    return a.get().then((doc)=>{
        var docs = doc.docs;
        var s = [];
        docs.forEach((item)=>{
            s.push(item.id);
        });
        return s;
    });
}