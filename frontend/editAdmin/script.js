function update(){ 
  var select = document.getElementById('agendas');//Importar Seletor = HTML 
  var text = select.options[select.selectedIndex].text; //Pegar o valor do seletor
  console.log(text); // Português

  if(text == "Agenda Educacional"){
    document.getElementById("dados1").innerHTML = ""
    document.getElementById("Eixo").innerHTML = "<option value=''>Selecione...</option><option value='Eixo1'>Ensino</option> <option value='Eixo2'>Equidade</option> <option value='Eixo3'>Pessoas</option> <option value='Eixo4'>Fluxo</option> <option value='Eixo5'>Gestão para Resultados</option><option value='Eixo6'>Infraestrutura e TI</option> <option value='Eixo7'>Incentivos</option>"
  }
  else if (text == "Agenda de Gestão"){
    document.getElementById("Eixo").innerHTML = "<option value=''>Selecione...</option><option value='Eixo8'>Gestão de Pessoas</option> <option value='Eixo9'>Sistema de Gestão</option>"
  }
}

function addQuestion(){
  var sizeList = 0;
  var Eixo = 0;
  $(document).ready(function (){
      var url = '/Pergunta' //endpoint
      var xhttp = new XMLHttpRequest() //script faz o request para o servidor a partir do URL usando o protocolo http, sem ter q atualizar a pag
      xhttp.open("get", url, false) //define o metódo do request (/get), o endpoint (url), async ou n
      xhttp.send() //envia o request
      var perguntas = JSON.parse(xhttp.responseText) 
      console.log(perguntas.length)
      sizeList = (perguntas.length + 1)

      var selectEixo = document.getElementById('Eixo');//Importar Seletor = HTML 
      var escolhido = selectEixo.options[selectEixo.selectedIndex].text;

      if( escolhido == "Ensino"){
        Eixo = 1
      }
      else if(escolhido == "Equidade"){
        Eixo = 2
      }
      else if(escolhido == "Pessoas"){
        Eixo = 3
      }
      else if(escolhido == "Fluxo"){
        Eixo = 4
      }
      else if(escolhido == "Gestão para Resultados"){
        Eixo = 5
      }
      else if(escolhido == "Infraestrutura e TI"){
        Eixo = 6
      }
      else if(escolhido == "Incentivos"){
        Eixo = 7
      }
      else if(escolhido == "Equidade"){
        Eixo = 8
      }

      console.log(Eixo)

      $.ajax({
        url: "http://127.0.0.1:3008/perguntaInsert",
        type: 'POST',
        data: {
            idPergunta: sizeList, 
            Pergunta: document.getElementById("questionModalText").value,
            idEixo: Eixo,
        },  
    },
    );
    
    ler()
    document.location.reload(true);  

    function ler() {
      $.ajax({
          url: "/Pergunta",
          type: 'GET',
          success: data => {
            for (var i = 0; i < 9 ;i++){
              $(dados1).append("")
              $(dados1).append(`<div class="row col-12 text-center align-items-center m-2 questions" id="question${data[i].idPergunta}"> 
              <!--linha das questões-->
              <div class="col-lg-1">
                <h6 style="border:black solid 1pt; border-radius:50px;">${data[i].idPergunta}</h6>
              </div>
            
              <div class="col-lg-3">
                <h6>${data[i].idPergunta}</h6>
              </div>
            
              <div class="col-lg-6">
                <h6>${data[i].Pergunta}</h6>
              </div>
            
              <div class="col-lg-2 d-flex justify-content-center">
                <button id="editBtn" onclick="openQuestion(${data[i].idPergunta});">
                  <i class="bi bi-trash"/></i>
                </button>
              </div>
            </div>`)
          };
          }
      });
}})}

function updateQuestions(){
  var select = document.getElementById('Eixo');
  var eixoSelect = select.options[select.selectedIndex].text;
  console.log(eixoSelect); // Português

  $(document).ready(function(){
      var url = '/Pergunta' //endpoint
      var xhttp = new XMLHttpRequest() //script faz o request para o servidor a partir do URL usando o protocolo http, sem ter q atualizar a pag
      xhttp.open("get", url, false) //define o metódo do request (/get), o endpoint (url), async ou n
      xhttp.send() //envia o request
      var data = JSON.parse(xhttp.responseText);

      if(eixoSelect == "Ensino"){
        data = data.filter(data => data.idEixo === 1);
        for (var i = 0; i < data.length ;i++){
          $(dados1).append("")
          $(dados1).append(`<div class="row col-12 text-center align-items-center m-2 questions" id="question${data[i].idPergunta}"> 
          <!--linha das questões-->
          <div class="col-lg-1">
            <h6 style="border:black solid 1pt; border-radius:50px;">${data[i].idPergunta}</h6>
          </div>
        
          <div class="col-lg-3">
            <h6>${data[i].idPergunta}</h6>
          </div>
        
          <div class="col-lg-6">
            <h6>${data[i].Pergunta}</h6>
          </div>
        
          <div class="col-lg-2 d-flex justify-content-center">
            <button id="editBtn" onclick="openQuestion(${data[i].idPergunta});">
            <i class="bi bi-trash" id="deleteBtn" onclick="deleteQuestion(${data[i].idPergunta})"/></i>
            </button>
          </div>
        </div>`)
      }}
      else if(eixoSelect == "Equidade"){
        data = data.filter(data => data.idEixo === 2);
        for (var i = 0; i < data.length ;i++){
          $(dados1).append("")
          $(dados1).append(`<div class="row col-12 text-center align-items-center m-2 questions" id="question${data[i].idPergunta}"> 
          <!--linha das questões-->
          <div class="col-lg-1">
            <h6 style="border:black solid 1pt; border-radius:50px;">${data[i].idPergunta}</h6>
          </div>
        
          <div class="col-lg-3">
            <h6>${data[i].idPergunta}</h6>
          </div>
        
          <div class="col-lg-6">
            <h6>${data[i].Pergunta}</h6>
          </div>
        
          <div class="col-lg-2 d-flex justify-content-center">
            <button id="editBtn" onclick="openQuestion(${data[i].idPergunta});">
              <i class="bi bi-trash" id="deleteBtn" onclick="deleteQuestion(${data[i].idPergunta})"/></i>
            </button>
          </div>
        </div>`)
      }}
      else if(eixoSelect == "Pessoas"){
        data = data.filter(data => data.idEixo === 3);
        for (var i = 0; i < data.length ;i++){
          $(dados1).append("")
          $(dados1).append(`<div class="row col-12 text-center align-items-center m-2 questions" id="question${data[i].idPergunta}"> 
          <!--linha das questões-->
          <div class="col-lg-1">
            <h6 style="border:black solid 1pt; border-radius:50px;">${data[i].idPergunta}</h6>
          </div>
        
          <div class="col-lg-3">
            <h6>${data[i].idPergunta}</h6>
          </div>
        
          <div class="col-lg-6">
            <h6>${data[i].Pergunta}</h6>
          </div>
        
          <div class="col-lg-2 d-flex justify-content-center">
            <button id="editBtn" onclick="openQuestion(${data[i].idPergunta});">
            <i class="bi bi-trash" id="deleteBtn" onclick="deleteQuestion(${data[i].idPergunta})"/></i>
            </button>
          </div>
        </div>`)
      }}
      else if(eixoSelect == "Fluxo"){
        data = data.filter(data => data.idEixo === 4);
        for (var i = 0; i < data.length ;i++){
          $(dados1).append("")
          $(dados1).append(`<div class="row col-12 text-center align-items-center m-2 questions" id="question${data[i].idPergunta}"> 
          <!--linha das questões-->
          <div class="col-lg-1">
            <h6 style="border:black solid 1pt; border-radius:50px;">${data[i].idPergunta}</h6>
          </div>
        
          <div class="col-lg-3">
            <h6>${data[i].idPergunta}</h6>
          </div>
        
          <div class="col-lg-6">
            <h6>${data[i].Pergunta}</h6>
          </div>
        
          <div class="col-lg-2 d-flex justify-content-center">
            <button id="editBtn" onclick="openQuestion(${data[i].idPergunta});">
            <i class="bi bi-trash" id="deleteBtn" onclick="deleteQuestion(${data[i].idPergunta})"/></i>
            </button>
          </div>
        </div>`)
      }}
      else if(eixoSelect == "Gestão para Resultados"){
        data = data.filter(data => data.idEixo === 5);
        for (var i = 0; i < data.length ;i++){
          $(dados1).append("")
          $(dados1).append(`<div class="row col-12 text-center align-items-center m-2 questions" id="question${data[i].idPergunta}"> 
          <!--linha das questões-->
          <div class="col-lg-1">
            <h6 style="border:black solid 1pt; border-radius:50px;">${data[i].idPergunta}</h6>
          </div>
        
          <div class="col-lg-3">
            <h6>${data[i].idPergunta}</h6>
          </div>
        
          <div class="col-lg-6">
            <h6>${data[i].Pergunta}</h6>
          </div>
        
          <div class="col-lg-2 d-flex justify-content-center">
            <button id="editBtn" onclick="openQuestion(${data[i].idPergunta});">
            <i class="bi bi-trash" id="deleteBtn" onclick="deleteQuestion(${data[i].idPergunta})"/></i>
            </button>
          </div>
        </div>`)
      }}
      else if(eixoSelect == "Infraestrutura e TI"){
        data = data.filter(data => data.idEixo === 6);
        for (var i = 0; i < data.length ;i++){
          $(dados1).append("")
          $(dados1).append(`<div class="row col-12 text-center align-items-center m-2 questions" id="question${data[i].idPergunta}"> 
          <!--linha das questões-->
          <div class="col-lg-1">
            <h6 style="border:black solid 1pt; border-radius:50px;">${data[i].idPergunta}</h6>
          </div>
        
          <div class="col-lg-3">
            <h6>${data[i].idPergunta}</h6>
          </div>
        
          <div class="col-lg-6">
            <h6>${data[i].Pergunta}</h6>
          </div>
        
          <div class="col-lg-2 d-flex justify-content-center">
            <button id="editBtn" onclick="openQuestion(${data[i].idPergunta});">
            <i class="bi bi-trash" id="deleteBtn" onclick="deleteQuestion(${data[i].idPergunta})"/></i>
            </button>
          </div>
        </div>`)
      }}
      else if(eixoSelect == "Incentivos"){
        data = data.filter(data => data.idEixo === 7);
        for (var i = 0; i < data.length ;i++){
          $(dados1).append("")
          $(dados1).append(`<div class="row col-12 text-center align-items-center m-2 questions" id="question${data[i].idPergunta}"> 
          <!--linha das questões-->
          <div class="col-lg-1">
            <h6 style="border:black solid 1pt; border-radius:50px;">${data[i].idPergunta}</h6>
          </div>
        
          <div class="col-lg-3">
            <h6>${data[i].idPergunta}</h6>
          </div>
        
          <div class="col-lg-6">
            <h6>${data[i].Pergunta}</h6>
          </div>
        
          <div class="col-lg-2 d-flex justify-content-center">
            <button id="editBtn" onclick="openQuestion(${data[i].idPergunta});">
              <i class="bi bi-trash" id="deleteBtn" onclick="deleteQuestion(${data[i].idPergunta})"/></i>
            </button>
          </div>
        </div>`)
      }}
      else if(eixoSelect == "Gestão de Pessoas"){
        data = data.filter(data => data.idEixo === 8);
        for (var i = 0; i < data.length ;i++){
          $(dados1).append("")
          $(dados1).append(`<div class="row col-12 text-center align-items-center m-2 questions" id="question${data[i].idPergunta}"> 
          <!--linha das questões-->
          <div class="col-lg-1">
            <h6 style="border:black solid 1pt; border-radius:50px;">${data[i].idPergunta}</h6>
          </div>
        
          <div class="col-lg-3">
            <h6>${data[i].idPergunta}</h6>
          </div>
        
          <div class="col-lg-6">
            <h6>${data[i].Pergunta}</h6>
          </div>
        
          <div class="col-lg-2 d-flex justify-content-center">
            <button id="editBtn" onclick="openQuestion(${data[i].idPergunta});">
            <i class="bi bi-trash" id="deleteBtn" onclick="deleteQuestion(${data[i].idPergunta})"/></i>
            </button>
          </div>
        </div>`)
      }}
      else if(eixoSelect == "Sistema de Gestão"){
        data = data.filter(data => data.idEixo === 9);
        for (var i = 0; i < data.length ;i++){
          $(dados1).append("")
          $(dados1).append(`<div class="row col-12 text-center align-items-center m-2 questions" id="question${data[i].idPergunta}"> 
          <!--linha das questões-->
          <div class="col-lg-1">
            <h6 style="border:black solid 1pt; border-radius:50px;">${data[i].idPergunta}</h6>
          </div>
        
          <div class="col-lg-3">
            <h6>${data[i].idPergunta}</h6>
          </div>
        
          <div class="col-lg-6">
            <h6>${data[i].Pergunta}</h6>
          </div>
        
          <div class="col-lg-2 d-flex justify-content-center">
            <button id="editBtn" onclick="openQuestion(${data[i].idPergunta});">
            <i class="bi bi-trash" id="deleteBtn" onclick="deleteQuestion(${data[i].idPergunta})"/></i>
            </button>
          </div>
        </div>`)
      }}
})};

function deleteQuestion(id){
  $.ajax({
    url: "http://127.0.0.1:3008/deletePergunta",
    type: 'POST',
    data: {
        idPergunta: id, 
    },  
},);

ler()  
document.location.reload(true);

function ler() {
  $.ajax({
      url: "/Pergunta",
      type: 'GET',
      success: data => {
        for (var i = 0; i < 9 ;i++){
          $(dados1).append("")
          $(dados1).append(`<div class="row col-12 text-center align-items-center m-2 questions" id="question${data[i].idPergunta}"> 
          <!--linha das questões-->
          <div class="col-lg-1">
            <h6 style="border:black solid 1pt; border-radius:50px;">${data[i].idPergunta}</h6>
          </div>
        
          <div class="col-lg-3">
            <h6>${data[i].idPergunta}</h6>
          </div>
        
          <div class="col-lg-6">
            <h6>${data[i].Pergunta}</h6>
          </div>
        
          <div class="col-lg-2 d-flex justify-content-center">
            <button id="editBtn" onclick="openQuestion(${data[i].idPergunta});">
              <i class="bi bi-trash"/></i>
            </button>
          </div>
        </div>`)
      };
      }
  });
}}

function setQuestionModal(questionObj) {
  let radioButtons = [];

  // sets the modal content according
  // to the question object
  $("#questionNumberText").text(questionObj.number + ".");
  $("#questionModalTitle").text(questionObj.title);
  $("#questionModalText").text(questionObj.question);
  $("#questionWeightSelect").prop("selectedIndex", questionObj.weight);

  // add the question options
  const questionOptionsList = questionObj.options;
  questionOptionsList.forEach((questionOption) => {
    let radioButton = `<div class="form-check p-2">
    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadio${questionOption.id}">
    <label class="form-check-label" contenteditable="true">
      <p>${questionOption.name}</p>
    </label>
  </div>`;

    radioButtons.push(radioButton);
  });

  $("#optionsBody").empty().append(radioButtons);
}

function removeQuestionCard(questionId) {
  questionCards = questionCards.filter((questionCard) => {
    return questionCard.id != questionId;
  });
  $(`#question${questionId}`).remove();
}

function openQuestion(questionId) {
  let questionObj = questionCards.filter((obj) => {
    return obj.id == questionId;
  })[0];
  setQuestionModal(questionObj);
  let questionModal = new bootstrap.Modal(
    document.getElementById("questionModal")
  );
  questionModal.toggle();
}

$(document).ready(function () {
  questionCards.forEach((question) => {
    let newQuestionCard = createQuestionCard(
      question.id,
      question.number,
      question.domain,
      question.question
    );
    $("#questionsWrapper").append(newQuestionCard);
  });
});

function test(){
  var tabsNewAnim = $('#navbarSupportedContent');
  var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
  var activeItemNewAnim = tabsNewAnim.find('.active');
  var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
  var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
  var itemPosNewAnimTop = activeItemNewAnim.position();
  var itemPosNewAnimLeft = activeItemNewAnim.position();
  $(".hori-selector").css({
    "top":itemPosNewAnimTop.top + "px", 
    "left":itemPosNewAnimLeft.left + "px",
    "height": activeWidthNewAnimHeight + "px",
    "width": activeWidthNewAnimWidth + "px"
  });
  $("#navbarSupportedContent").on("click","li",function(e){
    $('#navbarSupportedContent ul li').removeClass("active");
    $(this).addClass('active');
    var activeWidthNewAnimHeight = $(this).innerHeight();
    var activeWidthNewAnimWidth = $(this).innerWidth();
    var itemPosNewAnimTop = $(this).position();
    var itemPosNewAnimLeft = $(this).position();
    $(".hori-selector").css({
      "top":itemPosNewAnimTop.top + "px", 
      "left":itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
  });
}
$(document).ready(function(){
  setTimeout(function(){ test(); });
});
$(window).on('resize', function(){
  setTimeout(function(){ test(); }, 500);
});
$(".navbar-toggler").click(function(){
  setTimeout(function(){ test(); });
});

//Home

