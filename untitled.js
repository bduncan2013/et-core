
// wid: permissionsdto
// grantorwid: string
// granteegroup: string
// actiongroup: string
// targetgroup : string



// create userdto, testdto, permissiondto, securitydto, groupdto

exports.userdto = userdto = function userdto(params, callback) {
    testclearstorage();
    config = setconfig1();

    //add systemdto data
    executearray([{
        "executethis":"addwidmaster",
        "metadata.method": "userdto",
        "wid": "userwid",
        "userid": "userwid",
        "creator": "internal",
        "created": "01032014",
        "expiration": "01032014",
        "category": "testing",
        "subcategory": "testingxxx",
        "systemdto.securitydto.security.logged_id":false,
        "systemdto":"onetomany"
    },{
        "executethis":"addwidmaster",
        "metadata.method": "systemdto",
        "wid": "testdto",
        "creator": "internal",
        "created": "01022014",
        "expiration": "01032014",
        "category": "testing",
        "subcategory": "testingxxx",
        "systemdto":"onetomany"
    },{
        "executethis":"addwidmaster",
        "metadata.method": "permissiondto",
        "wid": "permissiondto",
        "accountwid":"userwid",
        "grantorwid": "userdto"
		"granteegroup": "userdto"
		"actiongroup": "string"
		"targetgroup" : "string"
        "category": "testing",
        "subcategory": "testingxxx",
        "systemdto":"onetomany"
    },{
        "executethis":"addwidmaster",
        "metadata.method": "securitydto",
        "wid": "securitydto",
        "category": "testing",
        "subcategory": "testingxxx",
        "systemdto":"onetomany"
    },{
        "executethis":"addwidmaster",
        "metadata.method": "groupdto",
        "wid": "groupdto",
        "category": "testing",
        "subcategory": "testingxxx",
        "systemdto":"onetomany"
    }],
    function (err, res) {
      res = logverify("et-dto", "userdto_result", "", res[0], "",{
        "creator": "internal",
        "created": "01022014",
        "expiration": "01032014",
        "category": "testing",
        "subcategory": "testingxxx"
     });

    if (callback instanceof Function) {
        callback(err, res);
        } else {
            return res;
        }
    });
}
