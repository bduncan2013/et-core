	exports.verifyarray = verifyarray = function verifyarray(v1, v2) {
		if (typeof(v1) !== typeof(v2)) {
			return false;
		}

		if (typeof(v1) === "function") {
			return v1.toString() === v2.toString();
		}

		if (v1 instanceof Object && v2 instanceof Object) {
			if (countProps(v1) !== countProps(v2)) {
				return false;
			}
			var r = true;
			for (k in v1) {
				r = objectEquals(v1[k], v2[k]);
				if (!r) {
					return false;
				}
			}
			return true;
		} else {
			return v1 === v2;
		}
		
		function countProps(obj) {
			var count = 0;
			for (k in obj) {
				if (obj.hasOwnProperty(k)) {
					count++;
				}
			}
			return count;
		}
	}

exports.testcallback = testcallback = function testcallback(params, callback) {
	console.log("<< testcallback >>");
	params["test_result"]="PASSnew";
	callback(null, params);
}

exports.mttest333 = mttest333 = function mttest333(params, callback) {
    console.log("<< mttest3 >>");
    testclearstorage();

    Add List
    var addlist = [
		{"executethis":"addwidmaster","wid":"colordto","metadata.method":"colordto","hue":"string","sat":"string"}, 
		{"executethis":"addwidmaster","wid":"color1","metadata.method":"colordto","hue":"red","sat":"red-sat"}, 
		{"executethis":"addwidmaster","wid":"color2","metadata.method":"colordto","hue":"green","sat":"green-sat"}, 
		{"executethis":"addwidmaster","wid":"color3","metadata.method":"colordto","hue":"blue","sat":"blue-sat"}, 
		{"executethis":"addwidmaster","wid":"color4","metadata.method":"colordto","hue":"cyan","sat":"cyan-sat"}, 
		{"executethis":"addwidmaster","wid":"color5","metadata.method":"colordto","hue":"magenta","sat":"magenta-sat"},
		{"executethis":"addwidmaster","wid":"color6","metadata.method":"colordto","hue":"yellow","sat":"yellow-sat"},
		{"executethis":"addwidmaster","wid":"color7","metadata.method":"colordto","hue":"black","sat":"black-sat"}
	];

	//Query List
    var querylist = [
		{"executethis":"querywid","rawmongoquery":{"$or":[{"hue":"string"}]}},
		{"executethis":"querywid","rawmongoquery":{"$or":[{"hue":"green"},{"sat":"blue-sat"}]}}, 
		{"executethis":"querywid","rawmongoquery":{"$and":[{"hue":"blue"}]}},
		{"executethis":"querywid","rawmongoquery":{"$and":[{"hue":"yellow"},{"sat":"red-sat"}]}}, 
		{"executethis":"querywid","rawmongoquery":{"$and":[{"sat":"cyan-sat"},{"hue":"cyan"},{"sat":"cyan-sat"}]}},
		{"executethis":"querywid","rawmongoquery":{"$or":[{"hue":"red"},{"$or":[{"sat":"magenta-sat"},{"hue":"magenta"},{"hue":"magenta"},{"hue":"red"}]}]}},
		{"executethis":"querywid","rawmongoquery":{"$or":[{"hue":"magenta"},{"$or":[{"sat":"magenta-sat"},{"$or":[{"hue":"magenta"},{"$or":[{"sat":"magenta-sat"}]}]}]}]}},
		{"executethis":"querywid","rawmongoquery":{"$or":[{"hue":"magenta"},{"$or":[{"sat":"cyan-sat"}]}]}},
		{"executethis":"querywid","rawmongoquery":{"$and":[{"hue":"magenta"},{"$and":[{"sat":"magenta-sat"}]}]}},
		{"executethis":"querywid","rawmongoquery":{"$and":[{"hue":"magenta"},{"$and":[{"sat":"magenta-sat"},{"$and":[{"sat":"red-sat"}]}]}]}},
		{"executethis":"querywid","rawmongoquery":{"$or":[{"hue":"red"},{"$and":[{"sat":"red-sat"}]}]}},
		{"executethis":"querywid","rawmongoquery":{"$or":[{"hue":"magenta"},{"$and":[{"hue":"cyan"},{"$and":[{"sat":"red"}]}]}]}},
		{"executethis":"querywid","rawmongoquery":{"$or":[{"hue":"blue"},{"$and":[{"hue":"yellow"},{"hue":"red"},{"$or":[{"sat":"cyan-sat"}]}]}]}},
		{"executethis":"querywid","rawmongoquery":{"$or":[{"hue":"yellow"},{"$and":[{"hue":"black"},{"$or":[{"sat":"black-sat"},{"sat":"blue-sat"}]}]}]}},
		{"executethis":"querywid","rawmongoquery":{"$or":[{"hue":"green"},{"$or":[{"hue":"green568"},{"hue":"red"},{"$or":[{"sat":"yellow-sat"},{"sat":"blue-sat"},{"$or":[{"hue":"cyan"}]}]}]}]}},
		{"executethis":"querywid","rawmongoquery":{"$and":[{"hue":"magenta"},{"$or":[{"hue":"green"},{"hue":"cyan"},{"$or":[{"sat":"yellow-sat"},{"sat":"red-sat"},{"$or":[{"hue":"blue"}]}]}]}]}},
		{"executethis":"querywid","rawmongoquery":{"$and":[{"hue":"cyan"},{"$or":[{"hue":"green"},{"$or":[{"sat":"cyan-sat"}]}]}]}},
	];	

    //Verify List
    var verifylist = [
        [{"wid":"colordto","metadata.method":"colordto","hue":"string","sat":"string"}],
        [
			{"wid":"color2","metadata.method":"colordto","hue":"green","sat":"green-sat"}, 
			{"wid":"color3","metadata.method":"colordto","hue":"blue","sat":"blue-sat"}
		],
		[{"wid":"color3","metadata.method":"colordto","hue":"blue","sat":"blue-sat"}],
		[],
		[{"wid":"color4","metadata.method":"colordto","hue":"cyan","sat":"cyan-sat"}],
		[
			{"wid":"color1","metadata.method":"colordto","hue":"red","sat":"red-sat"}, 
			{"wid":"color5","metadata.method":"colordto","hue":"magenta","sat":"magenta-sat"}
		],
		[{"wid":"color5","metadata.method":"colordto","hue":"magenta","sat":"magenta-sat"}],
		[
			{"wid":"color4","metadata.method":"colordto","hue":"cyan","sat":"cyan-sat"}, 
			{"wid":"color5","metadata.method":"colordto","hue":"magenta","sat":"magenta-sat"}
		],
		[{"wid":"color5","metadata.method":"colordto","hue":"magenta","sat":"magenta-sat"}],
		[],
		[{"wid":"color1","metadata.method":"colordto","hue":"red","sat":"red-sat"}],
		[{"wid":"color5","metadata.method":"colordto","hue":"magenta","sat":"magenta-sat"}],
		[{"wid":"color3","metadata.method":"colordto","hue":"blue","sat":"blue-sat"}],
		[
			{"wid":"color6","metadata.method":"colordto","hue":"yellow","sat":"yellow-sat"}, 
			{"wid":"color7","metadata.method":"colordto","hue":"black","sat":"black-sat"}
		],
		[
			{"wid":"color1","metadata.method":"colordto","hue":"red","sat":"red-sat"},
			{"wid":"color2","metadata.method":"colordto","hue":"green","sat":"green-sat"},
			{"wid":"color3","metadata.method":"colordto","hue":"blue","sat":"blue-sat"},
			{"wid":"color4","metadata.method":"colordto","hue":"cyan","sat":"cyan-sat"},
			{"wid":"color6","metadata.method":"colordto","hue":"yellow","sat":"yellow-sat"} 
		],
		[],
		[{"wid":"color4","metadata.method":"colordto","hue":"cyan","sat":"cyan-sat"}]
    ];


	proxyprinttodiv("addlist", addlist, 99);
	proxyprinttodiv("querylist", querylist, 99);
	proxyprinttodiv("verifylist", verifylist, 99);

	execute([addlist, querylist], function (err, res) {
        verifyarray[res[1],verifylist]
    });
	
	params["test_result"]="PASS";
	callback(null, params);
}