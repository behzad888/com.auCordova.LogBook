import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import { F7 } from 'services/f7'
import  Closing from 'services/closing';
import 'jquery';
@inject(HttpClient, Router, F7, Closing)
export class StudentsHome {
    constructor(httpClient, router, f7, closing) {
        httpClient.configure(x => {
            // x.withCredentials();
            // x.withHeader('Access-Control-Allow-Origin','*');
            // x.withHeader('charset', 'UTF-8');
            // x.withHeader('Content-Type', 'application/x-www-form-urlencoded');
            // x.withHeader('Host', '79.127.100.182:83');
        });
        this.httpClient = httpClient;
        this.baseUrl = 'http://79.127.100.182:83/Surface/Logbook/MobileApi/'
        this.router = router;
        this.f7 = f7;
        this.f7.hidePreloader();
        this.removeAdditionalModal();
        this.appVersion = 'browser';
        this.closing = closing;
        try {
            this.appVersion = cordova.Device.version.toLocaleLowerCase();
        } catch (err) { }

        // var actionNewForm =

    }

    removeAdditionalModal() {
        if ($('body .modal-overlay').length > 1) {
            $('body .modal-overlay')[1].remove()
        }
    }

    action(id, approvalStatus) {
        let that = this;
        this.Id = id;
        var controls = [{
            text: 'امکانات',
            label: true
        }, {
                text: 'ورود به فرم',
                color: 'blue',
                onClick: function () {
                    that.navigateToForm(that.Id);
                }
            }];
        if (approvalStatus == 1) {
            controls.push({
                text: 'حذف',
                color: 'red',
                onClick: function () {
                    that.activityDestroy(that.Id);
                }
            })
        }
        this.actionSheetButtons = [
            controls,
            // Second group
            [
                {
                    text: 'لغو'
                }
            ]
        ];
        this.f7.actions(this.actionSheetButtons);
    }

    navigateToForm(id) {
        var forms = this.router.routes.find(x => x.name === 'forms');
        forms.settings.user = 'studentHome';
        forms.settings.hash = this.hash;
        forms.settings.username = this.username;
        forms.settings.password = this.password;
        this.router.navigate('forms/' + id);
    }

    activityCreate(id) {
        var that = this;
        this.f7.closeModal('.popover');
        this.httpClient
            .post(this.baseUrl + 'Activity_Create?' + 'hash=' + this.hash + '&Type.Id=' + id)
            .then((response) => {
                // that.collection = response.content;
                that.getData();
            });
    }
    activityDestroy(id) {
        var that = this;
        that.f7.closeModal('.popover');
        this.f7.confirm('آیا اطمینان به حذف این مورد دارید؟', function () {
            that.httpClient
                .post(that.baseUrl + 'Activity_Destroy?' + 'hash=' + that.hash + '&Id=' + id)
                .then((response) => {
                    // that.collection = response.content;
                    that.getData();
                });
        });

    }
    activate(params, routeConfig, $navigationInstruction) {
        this.hash = params.id;
        this.username = routeConfig.username;
        this.password = routeConfig.password;

        this.closing.disableExit({},true);
        document.removeEventListener('backbutton',OnBackPress,false);
        var that = this;        
        function OnBackPress(e) {
            that.closing.closeApp(routeConfig.name, 'students', 'studentHome/' + that.hash);
        }
        document.addEventListener("backbutton",OnBackPress , false);

    }
    getData() {
        var that = this;
        this.f7.showPreloader('لطفا کمی صبر کنید');

        // this.formTypeCollection = [{ "Parent": 0, "Name": "دوره چرخشی", "UniqueWord": null, "Description": null, "FormWrapperId": 0, "Locked": false, "IsDepartmentFill": false, "HasChildren": false, "SeedIdentifier": null, "Id": 51 }, { "Parent": 0, "Name": "شیفت", "UniqueWord": null, "Description": null, "FormWrapperId": 0, "Locked": false, "IsDepartmentFill": false, "HasChildren": false, "SeedIdentifier": null, "Id": 59 }, { "Parent": 0, "Name": "جلسه آموزشی - حضور", "UniqueWord": null, "Description": null, "FormWrapperId": 0, "Locked": false, "IsDepartmentFill": false, "HasChildren": false, "SeedIdentifier": null, "Id": 48 }, { "Parent": 0, "Name": "ارائه و سخنرانی", "UniqueWord": null, "Description": null, "FormWrapperId": 0, "Locked": false, "IsDepartmentFill": false, "HasChildren": false, "SeedIdentifier": null, "Id": 43 }, { "Parent": 0, "Name": "فعالیت پروسیجر ", "UniqueWord": null, "Description": null, "FormWrapperId": 0, "Locked": false, "IsDepartmentFill": false, "HasChildren": false, "SeedIdentifier": null, "Id": 42 }];



        // this.collection = [{ "Type": { "Parent": 0, "Name": "شیفت", "UniqueWord": "شیفت", "Description": null, "FormWrapperId": 7, "Locked": true, "IsDepartmentFill": false, "HasChildren": false, "SeedIdentifier": "0", "Id": 59 }, "DetailAccount": { "MemberId": "00000000-0000-0000-0000-000000000000", "Contacts": { "FirstName": null, "LastName": null, "IsStudent": false, "IsAcademicStaff": false, "BirthDate": null, "FullName": "سید مهدی میرحسینی", "Gender": null, "FatherName": null, "IdentityCode": null, "IdentityIssueLocation": null, "NationalCode": null, "RegisterCity": null, "Photo_MapId": null, "Photo": null, "AcademicDegree": null, "MedicalCouncilNumber": 0, "EducationalDepartment": null, "WorkingArea": null, "Speciality": null, "EmploymentDate": null, "ResidentialStartDate": null, "GraduationDate": null, "PostGraduateYear": null, "DegreeOfEducation": null, "EducationalStatus": null, "Language": null, "Id": 0 }, "Organization": null, "Id": 17 }, "CreateDate": null, "InputFields": [{ "Type": "Simple", "DateRadio": "Simple", "Response": "1395/04/28", "FirstSelect": null, "SecondSelect": null, "ResponseTitle": "تاریخ شیفت", "MapId": null, "AddedBy": 1, "RangeMaxValue": 0, "Interval": 0, "Prompt": "تاریخ شیفت", "PromptClass": "MvcDynamicFieldPrompt", "Required": true, "HasGenerateDefualtTable": false, "RequiredMessage": "Required", "Error": null, "ErrorClass": "MvcDynamicFieldError", "ErrorIsClear": true, "InputHtmlAttributes": {}, "Keyword": null, "KeywordType": null, "MinDateOfDateNow": "", "MaxDateOfDateNow": "", "MinimumDateOfNow": "", "MaximumDateOfNow": "", "MinDate": "", "MaxDate": "", "StartMinDate": "", "StartMaxDate": "", "EndMinDate": "", "EndMaxDate": "", "DisplayEnabled": true, "HasStudentPermission": true, "HasViewGridActivity": true, "HasStaffPermission": true, "IsEvaluated": false, "UseInWorkflow": false, "Value": "1395/04/28", "HasDepartmentPermission": true, "FileFormat": [], "ParticipationInActivity": false, "Permission": { "Date": { "Required": "true", "Prompt": "true", "ResponseTitle": "true", "DateType": "true" } }, "HistoryData": [], "UseSearching": false, "HasEnabledPermission": false, "Template": "{Input:2bb514da-20ef-483a-9441-d03d83d0471a}", "Display": true, "Group": null, "Key": "040d2b0b31084779bd91c8bda519674c", "DataDictionary": {}, "HasClientData": false, "DisplayOrder": 10, "FieldExtention": { "Type": null, "Name": null, "Tails": { "SelectedId": ["1395/04/28"] } }, "ID": "MvcDynamicField_040d2b0b31084779bd91c8bda519674c", "IsKendo": true }, { "Size": 1, "MultipleSelection": false, "DefualtValue": false, "MultipleSelectionDefualtValue": null, "EmptyOption": null, "ShowEmptyOption": false, "Choices": [], "ResponseDelimiter": ", ", "Response": "", "FirstSelect": null, "SecondSelect": null, "ResponseTitle": "محل شیفت", "MapId": null, "AddedBy": 1, "RangeMaxValue": 0, "Interval": 0, "Prompt": "محل شیفت", "PromptClass": "MvcDynamicFieldPrompt", "Required": true, "HasGenerateDefualtTable": false, "RequiredMessage": "Required", "Error": null, "ErrorClass": "MvcDynamicFieldError", "ErrorIsClear": true, "InputHtmlAttributes": { "size": "1" }, "Keyword": "محل کار", "KeywordType": "3", "MinDateOfDateNow": null, "MaxDateOfDateNow": null, "MinimumDateOfNow": null, "MaximumDateOfNow": null, "MinDate": null, "MaxDate": null, "StartMinDate": null, "StartMaxDate": null, "EndMinDate": null, "EndMaxDate": null, "DisplayEnabled": true, "HasStudentPermission": true, "HasViewGridActivity": true, "HasStaffPermission": true, "IsEvaluated": false, "UseInWorkflow": false, "Value": "بیمارستان کاشانی", "HasDepartmentPermission": true, "FileFormat": [], "ParticipationInActivity": false, "Permission": { "Select": { "Required": "true", "Prompt": "true", "ResponseTitle": "true", "Keyword": "true", "KeywordType": "true", "MultipleSelection": "true", "UseInWorkflow": "true", "UseSearching": "true", "ParticipationInActivity": "true" } }, "HistoryData": [], "UseSearching": false, "HasEnabledPermission": false, "Template": "\u003cdiv class=\"MvcFieldWrapper\" id=\"{FieldWrapperId:0ec5e0a1-a01a-4384-9f73-5c06ab2db5d3}\"\u003e{Prompt:3cb27d35-c390-440a-9114-838e8ba0acf3}{Error:0c9cb943-e4b1-480e-ba27-bc1cba8ceefe}{Input:2bb514da-20ef-483a-9441-d03d83d0471a}\u003c/div\u003e", "Display": true, "Group": null, "Key": "ca974c4ea4144db79bd0f255d41b700e", "DataDictionary": {}, "HasClientData": false, "DisplayOrder": 20, "FieldExtention": { "Type": null, "Name": null, "Tails": { "SelectedId": ["1777"] } }, "ID": "MvcDynamicField_ca974c4ea4144db79bd0f255d41b700e", "IsKendo": true }, { "Size": 1, "MultipleSelection": false, "DefualtValue": false, "MultipleSelectionDefualtValue": null, "EmptyOption": null, "ShowEmptyOption": false, "Choices": [], "ResponseDelimiter": ", ", "Response": "", "FirstSelect": null, "SecondSelect": null, "ResponseTitle": "بخش محل شیفت", "MapId": null, "AddedBy": 1, "RangeMaxValue": 0, "Interval": 0, "Prompt": "بخش محل شیفت", "PromptClass": "MvcDynamicFieldPrompt", "Required": true, "HasGenerateDefualtTable": false, "RequiredMessage": "Required", "Error": null, "ErrorClass": "MvcDynamicFieldError", "ErrorIsClear": true, "InputHtmlAttributes": { "size": "1" }, "Keyword": "بخش محل انجام فعالیت", "KeywordType": "3", "MinDateOfDateNow": null, "MaxDateOfDateNow": null, "MinimumDateOfNow": null, "MaximumDateOfNow": null, "MinDate": null, "MaxDate": null, "StartMinDate": null, "StartMaxDate": null, "EndMinDate": null, "EndMaxDate": null, "DisplayEnabled": true, "HasStudentPermission": true, "HasViewGridActivity": true, "HasStaffPermission": true, "IsEvaluated": false, "UseInWorkflow": false, "Value": "اتاق عمل سرپایی", "HasDepartmentPermission": true, "FileFormat": [], "ParticipationInActivity": false, "Permission": { "Select": { "Required": "true", "Prompt": "true", "ResponseTitle": "true", "Keyword": "true", "KeywordType": "true", "MultipleSelection": "true", "UseInWorkflow": "true", "UseSearching": "true", "ParticipationInActivity": "true" } }, "HistoryData": [], "UseSearching": false, "HasEnabledPermission": false, "Template": "\u003cdiv class=\"MvcFieldWrapper\" id=\"{FieldWrapperId:0ec5e0a1-a01a-4384-9f73-5c06ab2db5d3}\"\u003e{Prompt:3cb27d35-c390-440a-9114-838e8ba0acf3}{Error:0c9cb943-e4b1-480e-ba27-bc1cba8ceefe}{Input:2bb514da-20ef-483a-9441-d03d83d0471a}\u003c/div\u003e", "Display": true, "Group": null, "Key": "41fb969d18d141d180522aa3c5011fc9", "DataDictionary": {}, "HasClientData": false, "DisplayOrder": 30, "FieldExtention": { "Type": null, "Name": null, "Tails": { "SelectedId": ["1771"] } }, "ID": "MvcDynamicField_41fb969d18d141d180522aa3c5011fc9", "IsKendo": true }, { "Size": 1, "MultipleSelection": false, "DefualtValue": false, "MultipleSelectionDefualtValue": null, "EmptyOption": null, "ShowEmptyOption": false, "Choices": [], "ResponseDelimiter": ", ", "Response": "", "FirstSelect": null, "SecondSelect": null, "ResponseTitle": "زمان شیفت", "MapId": null, "AddedBy": 1, "RangeMaxValue": 0, "Interval": 0, "Prompt": "زمان شیفت", "PromptClass": "MvcDynamicFieldPrompt", "Required": false, "HasGenerateDefualtTable": false, "RequiredMessage": "Required", "Error": null, "ErrorClass": "MvcDynamicFieldError", "ErrorIsClear": true, "InputHtmlAttributes": { "size": "1" }, "Keyword": "شیفت - زمان", "KeywordType": "3", "MinDateOfDateNow": null, "MaxDateOfDateNow": null, "MinimumDateOfNow": null, "MaximumDateOfNow": null, "MinDate": null, "MaxDate": null, "StartMinDate": null, "StartMaxDate": null, "EndMinDate": null, "EndMaxDate": null, "DisplayEnabled": true, "HasStudentPermission": true, "HasViewGridActivity": true, "HasStaffPermission": true, "IsEvaluated": false, "UseInWorkflow": false, "Value": "شب", "HasDepartmentPermission": true, "FileFormat": [], "ParticipationInActivity": false, "Permission": { "Select": { "Required": "true", "Prompt": "true", "ResponseTitle": "true", "Keyword": "true", "KeywordType": "true", "MultipleSelection": "true", "UseInWorkflow": "true", "UseSearching": "true", "ParticipationInActivity": "true" } }, "HistoryData": [], "UseSearching": false, "HasEnabledPermission": false, "Template": "\u003cdiv class=\"MvcFieldWrapper\" id=\"{FieldWrapperId:0ec5e0a1-a01a-4384-9f73-5c06ab2db5d3}\"\u003e{Prompt:3cb27d35-c390-440a-9114-838e8ba0acf3}{Error:0c9cb943-e4b1-480e-ba27-bc1cba8ceefe}{Input:2bb514da-20ef-483a-9441-d03d83d0471a}\u003c/div\u003e", "Display": true, "Group": null, "Key": "532d12f726d2435a924ab0cc043e9053", "DataDictionary": {}, "HasClientData": false, "DisplayOrder": 40, "FieldExtention": { "Type": null, "Name": null, "Tails": { "SelectedId": ["2751"] } }, "ID": "MvcDynamicField_532d12f726d2435a924ab0cc043e9053", "IsKendo": true }, { "Size": 1, "MultipleSelection": false, "DefualtValue": false, "MultipleSelectionDefualtValue": null, "EmptyOption": null, "ShowEmptyOption": false, "Choices": [], "ResponseDelimiter": ", ", "Response": "", "FirstSelect": null, "SecondSelect": null, "ResponseTitle": "هیات علمی ناظر", "MapId": null, "AddedBy": 1, "RangeMaxValue": 0, "Interval": 0, "Prompt": "هیات علمی ناظر", "PromptClass": "MvcDynamicFieldPrompt", "Required": true, "HasGenerateDefualtTable": false, "RequiredMessage": "Required", "Error": null, "ErrorClass": "MvcDynamicFieldError", "ErrorIsClear": true, "InputHtmlAttributes": { "size": "1" }, "Keyword": "", "KeywordType": "2", "MinDateOfDateNow": null, "MaxDateOfDateNow": null, "MinimumDateOfNow": null, "MaximumDateOfNow": null, "MinDate": null, "MaxDate": null, "StartMinDate": null, "StartMaxDate": null, "EndMinDate": null, "EndMaxDate": null, "DisplayEnabled": true, "HasStudentPermission": true, "HasViewGridActivity": true, "HasStaffPermission": false, "IsEvaluated": false, "UseInWorkflow": true, "Value": " امید  احمدی", "HasDepartmentPermission": true, "FileFormat": [], "ParticipationInActivity": false, "Permission": { "Select": { "Required": "true", "Prompt": "true", "ResponseTitle": "true", "Keyword": "true", "KeywordType": "true", "MultipleSelection": "true", "UseInWorkflow": "true", "UseSearching": "true", "ParticipationInActivity": "true" } }, "HistoryData": [], "UseSearching": false, "HasEnabledPermission": false, "Template": "\u003cdiv class=\"MvcFieldWrapper\" id=\"{FieldWrapperId:0ec5e0a1-a01a-4384-9f73-5c06ab2db5d3}\"\u003e{Prompt:3cb27d35-c390-440a-9114-838e8ba0acf3}{Error:0c9cb943-e4b1-480e-ba27-bc1cba8ceefe}{Input:2bb514da-20ef-483a-9441-d03d83d0471a}\u003c/div\u003e", "Display": true, "Group": null, "Key": "b54c633be99f4014a802aa9d3e04b504", "DataDictionary": {}, "HasClientData": false, "DisplayOrder": 50, "FieldExtention": { "Type": null, "Name": null, "Tails": { "SelectedId": ["7"] } }, "ID": "MvcDynamicField_b54c633be99f4014a802aa9d3e04b504", "IsKendo": true }, { "RegularExpression": null, "RegexMessage": "Invalid", "IsEmail": false, "IsNumber": false, "IsWebSite": false, "Class": "form-control", "Response": "", "FirstSelect": null, "SecondSelect": null, "ResponseTitle": "بازخورد به دستیار", "MapId": null, "AddedBy": 1, "RangeMaxValue": 0, "Interval": 0, "Prompt": "بازخورد به دستیار", "PromptClass": "MvcDynamicFieldPrompt", "Required": false, "HasGenerateDefualtTable": false, "RequiredMessage": "Required", "Error": null, "ErrorClass": "MvcDynamicFieldError", "ErrorIsClear": true, "InputHtmlAttributes": {}, "Keyword": null, "KeywordType": null, "MinDateOfDateNow": null, "MaxDateOfDateNow": null, "MinimumDateOfNow": null, "MaximumDateOfNow": null, "MinDate": null, "MaxDate": null, "StartMinDate": null, "StartMaxDate": null, "EndMinDate": null, "EndMaxDate": null, "DisplayEnabled": true, "HasStudentPermission": false, "HasViewGridActivity": true, "HasStaffPermission": true, "IsEvaluated": false, "UseInWorkflow": false, "Value": "", "HasDepartmentPermission": true, "FileFormat": [], "ParticipationInActivity": false, "Permission": { "TextArea": { "Required": "true", "Prompt": "true", "ResponseTitle": "true" } }, "HistoryData": [], "UseSearching": false, "HasEnabledPermission": false, "Template": "\u003cdiv class=\"MvcFieldWrapper\" id=\"{FieldWrapperId:0ec5e0a1-a01a-4384-9f73-5c06ab2db5d3}\"\u003e{Prompt:3cb27d35-c390-440a-9114-838e8ba0acf3}{Error:0c9cb943-e4b1-480e-ba27-bc1cba8ceefe}{Input:2bb514da-20ef-483a-9441-d03d83d0471a}\u003c/div\u003e", "Display": true, "Group": null, "Key": "9db4b4edee4245e5a5c42349442041e6", "DataDictionary": {}, "HasClientData": false, "DisplayOrder": 70, "FieldExtention": null, "ID": "MvcDynamicField_9db4b4edee4245e5a5c42349442041e6", "IsKendo": false }, { "Size": 1, "MultipleSelectionDefualtValue": null, "EmptyOption": null, "ShowEmptyOption": false, "Response": "", "FirstSelect": null, "SecondSelect": null, "ResponseTitle": "ارزیابی کیفی فعالیت", "MapId": null, "AddedBy": 1, "RangeMaxValue": 5, "Interval": 1, "Prompt": "ارزیابی کیفی فعالیت", "PromptClass": "MvcDynamicFieldPrompt", "Required": true, "HasGenerateDefualtTable": false, "RequiredMessage": "Required", "Error": null, "ErrorClass": "MvcDynamicFieldError", "ErrorIsClear": true, "InputHtmlAttributes": { "size": "1" }, "Keyword": null, "KeywordType": null, "MinDateOfDateNow": null, "MaxDateOfDateNow": null, "MinimumDateOfNow": null, "MaximumDateOfNow": null, "MinDate": null, "MaxDate": null, "StartMinDate": null, "StartMaxDate": null, "EndMinDate": null, "EndMaxDate": null, "DisplayEnabled": true, "HasStudentPermission": false, "HasViewGridActivity": true, "HasStaffPermission": true, "IsEvaluated": false, "UseInWorkflow": false, "Value": "", "HasDepartmentPermission": true, "FileFormat": [], "ParticipationInActivity": false, "Permission": { "Slider": { "Interval": "true", "Prompt": "true", "ResponseTitle": "true", "RangeMaxValue": "true", "Required": "true" } }, "HistoryData": [], "UseSearching": false, "HasEnabledPermission": false, "Template": "\u003cdiv class=\"MvcFieldWrapper\" id=\"{FieldWrapperId:0ec5e0a1-a01a-4384-9f73-5c06ab2db5d3}\"\u003e{Prompt:3cb27d35-c390-440a-9114-838e8ba0acf3}{Error:0c9cb943-e4b1-480e-ba27-bc1cba8ceefe}{Input:2bb514da-20ef-483a-9441-d03d83d0471a}\u003c/div\u003e", "Display": true, "Group": null, "Key": "56ad263657ee45ea87eec8b16ad9e649", "DataDictionary": {}, "HasClientData": false, "DisplayOrder": 80, "FieldExtention": null, "ID": "MvcDynamicField_56ad263657ee45ea87eec8b16ad9e649", "IsKendo": false }], "ApprovalStatus": 1, "Id": 39585 }];
        // this.f7.hidePreloader();

        this.httpClient
            .post(this.baseUrl + 'Activity_Read?' + 'hash=' + this.hash)
            .then((response) => {
                that.collection = response.content;
                that.f7.hidePreloader();
            }).catch(err => {
                that.f7.hidePreloader();
            });

        this.httpClient
            .post(this.baseUrl + 'Department_GroundDefinitionGroup_EditorTemplate_Read?' + 'hash=' + this.hash)
            .then((response) => {
                that.formTypeCollection = response.content;
                // that.f7.hidePreloader();
            }).catch(err => {
                // that.f7.hidePreloader();
            });
        this.removeAdditionalModal();
    }
    attached() {
        this.getData();
        var that = this;
        $('.pull-to-refresh-content').on('refresh', function (e) {
            that.getData();
            that.f7.pullToRefreshDone();
        });
        this.f7.initPullToRefresh($('.page'));
    }

    showAlert() {
        this.f7.alert('salam');
    }

}