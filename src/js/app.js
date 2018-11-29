App = {
  web3Provider: null,
  contracts: {},

  initWeb3: async function() {
        // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() { // initialized contract and load functions

    $.getJSON('../DigitalIdentity.json', function(data) {

      var DigitalIdentityArtifact = data;
      App.contracts.DigitalIdentity = TruffleContract(DigitalIdentityArtifact);

      App.contracts.DigitalIdentity.setProvider(App.web3Provider);

      App.contracts.DigitalIdentity.deployed().then(function(instance) {

        //return instance.setInfo("Oliver", "Escosura", "Male", 0417, "Philippines", "UPHSL", 2018, "BSCS");
        return instance.getInfo();
      }).then(function(result) {
        console.log({Name: result[0],
                    Lastname: result[1],
                    Gender: result[2],
                    DateOfBirth: result[3].toString(),
                    HomeAddress: result[4],
                    SchoolName: result[5],
                    YearOfGraduate: result[6].toString(),
                    Course: result[7]
                  });
      });
    });
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-getInfo', App.getInfo);
  },

  getInfo: function(event) {
    event.preventDefault();

    $.getJSON('../DigitalIdentity.json', function(data) {

      var DigitalIdentityArtifact = data;
      App.contracts.DigitalIdentity = TruffleContract(DigitalIdentityArtifact);

      App.contracts.DigitalIdentity.setProvider(App.web3Provider);

      App.contracts.DigitalIdentity.deployed().then(function(instance) {

        return instance.getInfo();
      }).then(function(result) {
        var fname = result[0];
        var lname =  result[1];
        var dob = result[2];
        var gender = result[3];

        var address = result[4];
        var school_name = result[5];
        var school_year = result[6];
        var course  = result[7];
        //console.log(fname);

        //Fixed Information
        document.getElementById('fname').value=fname.toString();
        document.getElementById('lname').value=lname.toString();
        document.getElementById('dob').value=dob.toString();
        document.getElementById('gender').value=gender.toString();

        //Updatable information
        document.getElementById('address').value=address.toString();
        document.getElementById('school_name').value=school_name.toString();
        document.getElementById('school_year').value=school_year.toString();
        document.getElementById('course').value=course.toString();

        document.getElementById('fname').disabled = "disabled";
        document.getElementById('lname').disabled = "disabled";
        document.getElementById('dob').disabled = "disabled";
        document.getElementById('gender').disabled = "disabled";

        alert("User's information received!!")
      });
    });
  }
};

function setInfo() {
  $.getJSON('../DigitalIdentity.json', function(data) {

    var DigitalIdentityArtifact = data;
    App.contracts.DigitalIdentity = TruffleContract(DigitalIdentityArtifact);

    App.contracts.DigitalIdentity.setProvider(App.web3Provider);

    App.contracts.DigitalIdentity.deployed().then(function(instance) {

      var fname = document.getElementById('fname').value;
      var lname = document.getElementById('lname').value;
      var gender = document.getElementById('gender').value;
      var dob = document.getElementById('dob').value;

      var address = document.getElementById('address').value;
      var school_name = document.getElementById('school_name').value;
      var school_year = document.getElementById('school_year').value;
      var course = document.getElementById('course').value;

      return instance.setInfo(fname, lname, gender, dob, address, school_name, school_year, course);
      //return instance.updateInfo(home_addres);
    }).then(function(result) {
      alert("User information saved!!")
      console.log(result);
    });
  });
}

function updateInfo() {
  $.getJSON('../DigitalIdentity.json', function(data) {

    var DigitalIdentityArtifact = data;
    App.contracts.DigitalIdentity = TruffleContract(DigitalIdentityArtifact);

    App.contracts.DigitalIdentity.setProvider(App.web3Provider);

    App.contracts.DigitalIdentity.deployed().then(function(instance) {

      var home_addres = document.getElementById('address').value;
      //return instance.setInfo("Oliver", "Escosura", "Male", 0417, "Philippines", "UPHSL", 2018, "BSCS");
      return instance.updateInfo(home_addres);
    }).then(function(result) {
      alert("Update successfully!!")
      console.log(result);
    });
  });
}

$(function() {
  $(window).load(function() {
    App.initWeb3();
  });
});
