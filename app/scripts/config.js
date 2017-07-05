'use strict';

 angular.module("app.config", [])

.constant("APP_CONFIG", {
	"baseUrl": "http://localhost:8080"
})

.constant("VERSION_CONFIG", {
	"options": {
		"cwd": "../"
	}
})

;