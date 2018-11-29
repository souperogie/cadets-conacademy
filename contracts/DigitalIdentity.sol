pragma solidity 0.4.24;

contract DigitalIdentity {

    //to do:
    //1. getinfo only partners, user
    //2. school name => address => send notification (Gov. ids)
    //3. mapping inside educ
    //4. self update visible private

    address myAddress;

    function getAddress() constant public returns (address) {
      return user;
    }

    function setAddress(address _address) public {
      myAddress = _address;
    }

    struct userDetails {
        string firstname;
        string lastname;
        string gender;
        uint dob;

        //updatable information
        string home_address;
    }

    struct educationalBackground {
        string sch_name;
        uint yr;
        string course;
        bool status;
    }

    address user = 0xb34d08317630C7a7C3FE06d134ffb636488d7362;
    address customer = 0x423a09847441282FA0bFBCB8Ce88116FA4264d4C;
    address partner = 0xde8636024C0DaA5F883EC0d694cA03d12b9f6eAe;

    mapping(address => userDetails) uInfo;

    mapping(address => educationalBackground) educBackground;

    modifier onlyUser() {
        require(msg.sender == user, "Not Authorized");
        _;
    }

    modifier onlyCustomer() {
        require(msg.sender == customer, "Noy Authorized");
        _;
    }


    modifier onlyPartner() {
        require(msg.sender == partner, "Not Authorized");
        _;
    }

    function loginUser() public {
        user = msg.sender;
    }

    function loginCustomer() public {
        customer = msg.sender;
    }

    function loginPartner() public {
        partner = msg.sender;
    }

    function setInfo(string _firstname,
                    string _lastname,
                    string _gender,
                    uint _dob,
                    string _home_address,
                    string _sch_name,
                    uint _yr,
                    string _course) public {

        userDetails memory newUserDetails = uInfo[user];
        // fixed info
        newUserDetails.firstname = _firstname;
        newUserDetails.lastname = _lastname;
        newUserDetails.gender = _gender;
        newUserDetails.dob = _dob;
        // updatable
        newUserDetails.home_address = _home_address;

        educationalBackground memory newEducationalBackground = educBackground[user];
        newEducationalBackground.sch_name = _sch_name;
        newEducationalBackground.yr = _yr;
        newEducationalBackground.course = _course;

        uInfo[user] = newUserDetails;
        educBackground[user] = newEducationalBackground;
    }



    function getInfo() constant public returns(string, string, string, uint, string, string, uint, string) {

        return (uInfo[user].firstname,
                uInfo[user].lastname,
                uInfo[user].gender,
                uInfo[user].dob,
                uInfo[user].home_address,
                educBackground[user].sch_name,
                educBackground[user].yr,
                educBackground[user].course
                );
    }

    function updateInfo(string _home_address) public {

        userDetails memory newUserDetails = uInfo[user];
        newUserDetails.home_address = _home_address;

        uInfo[user] = newUserDetails;
    }

    function userVerify() public {
        educationalBackground memory newEducationalBackground = educBackground[user];

        newEducationalBackground.status = true;
        educBackground[user] = newEducationalBackground;
    }
}
