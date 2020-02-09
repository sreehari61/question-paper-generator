        var selectedsem;
        var selectedscheme;
        var selectedsubject;
        var selectedexam;
        var selectedbranch

        $('#branch').change(()=>{
            selectedbranch = $( "#branch option:selected" ).val();
            // alert(selectedbranch);
            if(selectedbranch != "select"){
                $('#sem').prop('disabled', function(i, v) { return v ? !v : v; });
                $('#sem').change(()=>{
                    selectedsem = $( "#sem option:selected" ).val();
                    // alert(selectedbranch+" / "+selectedsem);
                    if(selectedsem != "select"){
                        $('#scheme').prop('disabled', function(i, v) { return v ? !v : v; });
                        $('#scheme').change(()=>{
                            selectedscheme = $( "#scheme option:selected" ).val();
                            // alert(selectedbranch+" / "+selectedsem+" / "+selectedscheme );
                            if(selectedscheme != "select"){
                                q();
                                async function q(){
                                    var subres = await a(selectedbranch,selectedsem,selectedscheme);
                                    $('#subject').find('option').remove();
                                    // console.log(subres);
                                    $('#subject').append(`<option value="select"> 
                                                                Select Subject
                                                            </option>`);
                                    subres.forEach((sub)=>{
                                        // console.log(sub);
                                        $('#subject').append(`<option value="${sub}"> 
                                                                ${sub} 
                                                            </option>`);
                                    });
                                }
                                $('#subject').prop('disabled', function(i, v) { return v ? !v : v; });
                                $('#subject').change(()=>{
                                    selectedsubject = $( "#subject option:selected" ).val();
                                    if(selectedscheme != "select"){
                                        $('#exam').prop('disabled', function(i, v) { return v ? !v : v; });
                                        $('#exam').change(()=>{
                                            selectedexam = $("#exam option:selected" ).val();
                                            if(selectedscheme != "select"){
                                                // get(selectedbranch,selectedsem,selectedscheme,selectedsubject,selectedexam);
                                                selectedexam = $("#exam option:selected" ).val();
                                            }else{
                                                alert("Please Select the Exam type");
                                            }
                                        });
                                    }else{
                                        $('#exam').prop('disabled', function(i, v) { return v ? v : !v; });
                                    }
                                });
                            }else{
                                $('#subject').prop('disabled', function(i, v) { return v ? v : !v; });
                                $('#exam').prop('disabled', function(i, v) { return v ? v : !v; });
                            }           
                        });
                    }else{
                        $('#scheme').prop('disabled', function(i, v) { return v ? v : !v; });
                        $('#subject').prop('disabled', function(i, v) { return v ? v : !v; });
                        $('#exam').prop('disabled', function(i, v) { return v ? v : !v; });
                    }
                });
            }else{
                $('#sem').prop('disabled', function(i, v) { return v ? v : !v; });
                $('#scheme').prop('disabled', function(i, v) { return v ? v : !v; });
                $('#subject').prop('disabled', function(i, v) { return v ? v : !v; });
                $('#exam').prop('disabled', function(i, v) { return v ? v : !v; });
            }
        });

        $('#submit').on('click',(e)=>{
            e.preventDefault();
            get(selectedbranch,selectedsem,selectedscheme,selectedsubject,selectedexam);
        });

        async function a(branch,sem,scheme){
            return await getsubjects(branch,sem,scheme);
        }
        

        async function get(branch,sem,scheme,sub,exam){  
            var questions = [];
            // /cse/sem1/scheme17/subject/unit3/2marks
            document.getElementById("paper").innerHTML = "<center><p style='line-height:100vh;'><img src='./loading.gif'/></p></center>";
            var _2marks = await getquestions(branch,sem,scheme,sub,exam,1);
            var sec1 = await getquestions(branch,sem,scheme,sub,exam,2);
            questions.push(_2marks,sec1);
            console.log(questions);
            // questions.push(sec1);
            // while(!Array.isArray(questions) && !questions.length){
            //     document.getElementById("paper").innerHTML = "<p style='text-align:center;width:100%;height:100%;'>Generating Paper...<p>";
            // }
            // document.getElementById("paper").innerHTML = "";
            document.getElementById("paper").innerHTML = "";
            addtopage(questions);
            $('#paper')[0].scrollIntoView(true);
        } 


function addtopage(data){
    var template = `
        <div class="question-paper-main">
            <div class="title-box" style="text-transform: uppercase;">
                <span>G.pulla reddy ENGINEERING COLLEGE(AUTONOMOUS):KURNOOL</span><br>
                <span>B.TECH ${$('#sem option:selected').text()} SEMESTER</span><br>
                <span>${$('#exam option:selected').text()} EXAMINATIONS - OCTOBER 2019</span><br>
                <span>DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING</span><br>
                <span>${$('#subject option:selected').text()}</span><br>
                <span>(scheme-2017)</span>
            </div>
            <div class="main">
                <div class="2marks-div">
                    <span>1.</span><br>
                    <span>&emsp;&nbsp;a. ${data[0][0][0]}.</span><br>
                    ${data[0][0][1] ?`<center><img height=200 width=200 src="${data[0][0][1]}"/></center><br>`:""}
                    <span>&emsp;&nbsp;b. ${data[0][1][0]}.</span><br>
                    ${data[0][1][1] ?`<center><img height=200 width=200 src="${data[0][1][1]}"/></center><br>`:""}
                    <span>&emsp;&nbsp;c. ${data[0][2][0]}.</span><br>
                    ${data[0][2][1] ?`<center><img height=200 width=200 src="${data[0][2][1]}"/></center><br>`:""}
                </div><br>
                <div class="section1">
                    <center><p style="font-weight: bold;border-bottom:1px solid black;">Section - I</p></center>
                    <span>2.</span><br>
                    <span>&emsp;&nbsp;a. ${data[1][0][0][0]}</span><br>
                    ${data[1][0][0][1] ?`<center><img height=200 width=200 src="${data[1][0][0][1]}"/></center><br>`:""}
                    <span>&emsp;&nbsp;b. ${data[1][0][1][0]}</span><br>
                    ${data[1][0][1][1] ?`<center><img height=200 width=200 src="${data[1][0][1][1]}"/></center><br>`:""}
                    <p style="font-weight: bold;text-align: center;">(OR)</p>
                    <span>3.</span><br>
                    <span>&emsp;&nbsp;a. ${data[1][0][2][0]}</span><br>
                    ${data[1][0][2][1] ?`<center><img height=200 width=200 src="${data[1][0][2][1]}"/></center><br>`:""}
                    <span>&emsp;&nbsp;b. ${data[1][0][3][0]}</span><br>
                    ${data[1][0][3][1] ?`<center><img height=200 width=200 src="${data[1][0][3][1]}"/></center><br>`:""}
                </div>
                <div class="section2">
                    <center><p style="text-align: center;font-weight: bold;border-bottom:1px solid black;">Section - II</p></center>
                    <span>4.</span><br>
                    <span>&emsp;&nbsp;a. ${data[1][1][0][0]}</span><br>
                    ${data[1][1][0][1] ?`<center><img height=200 width=200 src="${data[1][1][0][1]}"/></center><br>`:""}
                    <span>&emsp;&nbsp;b. ${data[1][1][1][0]}</span><br>
                    ${data[1][1][1][1] ?`<center><img height=200 width=200 src="${data[1][1][1][1]}"/></center><br>`:""}
                    <p style="font-weight: bold;text-align: center;">(OR)</p>
                    <span>5.</span><br>
                    <span>&emsp;&nbsp;a. ${data[1][1][2][0]}</span><br>
                    ${data[1][1][2][1] ?`<center><img height=200 width=200 src="${data[1][1][2][1]}"/></center><br>`:""}
                    <span>&emsp;&nbsp;b. ${data[1][1][3][0]}</span><br>
                    ${data[1][1][3][1] ?`<center><img height=200 width=200 src="${data[1][1][3][1]}"/></center><br>`:""}
                </div>
                <div class="section3">
                    <center><p style="text-align: center;font-weight: bold;border-bottom:1px solid black;">Section - III</p></center>
                    <span>6.</span><br>
                    <span>&emsp;&nbsp;a. ${data[1][2][0][0]}</span><br>
                    ${data[1][2][0][1] ?`<center><img height=200 width=200 src="${data[1][2][0][1]}"/></center><br>`:""}
                    <span>&emsp;&nbsp;b. ${data[1][2][1][0]}</span><br>
                    ${data[1][2][1][1] ?`<center><img height=200 width=200 src="${data[1][2][1][1]}"/></center><br>`:""}
                    <p style="font-weight: bold;text-align: center;">(OR)</p>
                    <span>7.</span><br>
                    <span>&emsp;&nbsp;a. ${data[1][2][2][0]}</span><br>
                    ${data[1][2][2][1] ?`<center><img height=200 width=200 src="${data[1][2][2][1]}"/></center><br>`:""}
                    <span>&emsp;&nbsp;b. ${data[1][2][3][0]}</span><br>
                    ${data[1][2][3][1] ?`<center><img height=200 width=200 src="${data[1][2][3][1]}"/></center><br>`:""}
                </div>
            </div>
        </div>
    `;
    
    document.getElementById("paper").innerHTML = template;
}