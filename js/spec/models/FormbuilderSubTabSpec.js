describe('FormBuilder SubTab', function() {
    beforeEach(function() {
        var model = new wxApp.FormBuilderSubTab();
        this.model = model;
    });

    afterEach(function() {
        this.model = null;
    });

    it('should have default title of My Form Title', function() {
        expect( this.model.get('title') ).toEqual('My Form Title');
    });

    it('should have default content of formbuilder', function() {
        expect( this.model.get('content') ).toEqual('formbuilder');
    });

    describe('with infobox', function() {
        beforeEach(function() {
            this.model = new wxApp.FormBuilderSubTab({
                config: {
                    formElements: [
                        {
                            controlTitle: "Info Box",
                            control: "div",
                            label: "Informational text",
                            innerHTML: "HERE ARE SOME OTHER WAYS USERS CAN INPUT DATA:",
                            ordinal: 9
                        }
                    ]
                }
            });
        });

        it('should be added to the form elements array', function() {
            expect( this.model.get('config').formElements.length ).toEqual(1);
        });

        it('should be of the correct class', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control instanceof wxApp.FormBuilderControlInfo ).toBeTruthy();
        });

        it('should have the correct data', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control.get('innerHTML') ).toEqual('HERE ARE SOME OTHER WAYS USERS CAN INPUT DATA:');
        });
    });

    describe('with textarea', function() {
        beforeEach(function() {
            this.model = new wxApp.FormBuilderSubTab({
                config: {
                    formElements: [
                        {
                            controlTitle: "ParagraphText",
                            control: "textarea",
                            label: "Brief Explanation of the App Functionality",
                            ordinal: 34
                        }
                    ]
                }
            });
        });

        it('should be added to the form elements array', function() {
            expect( this.model.get('config').formElements.length ).toEqual(1);
        });

        it('should be of the correct class', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control instanceof wxApp.FormBuilderControlTextarea ).toBeTruthy();
        });

        it('should have the correct data', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control.get('label') ).toEqual('Brief Explanation of the App Functionality');
        });
    });

    describe('with radiofieldset', function() {
        beforeEach(function() {
            this.model = new wxApp.FormBuilderSubTab({
                config: {
                    formElements: [
                        {
                            controlTitle: "Multiple Choice",
                            control: "radiofieldset",
                            title: "Do you like me?",
                            radioGroup: [
                                {
                                    label: "Yes",
                                    control: "input",
                                    attributes: {
                                        type: "radio",
                                        name: ""
                                    },
                                    collectionId: "c245"
                                },
                                {
                                    label: "No",
                                    control: "input",
                                    attributes: {
                                        type: "radio",
                                        name: ""
                                    },
                                    collectionId: "c245"
                                },
                                {
                                    label: "Maybe",
                                    control: "input",
                                    attributes: {
                                        type: "radio",
                                        name: ""
                                    },
                                    collectionId: "c245"
                                }
                            ],
                            ordinal: 12,
                            advanced: false
                        }
                    ]
                }
            });
        });

        it('should be added to the form elements array', function() {
            expect( this.model.get('config').formElements.length ).toEqual(1);
        });

        it('should be of the correct class', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control instanceof wxApp.FormBuilderControlRadioFieldset ).toBeTruthy();
        });

        it('should have the correct data', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control.get('radioGroup').length ).toEqual(3);
            expect( control.get('radioGroup').at(0).get('label') ).toEqual('Yes');
            expect( control.get('radioGroup').at(1).get('label') ).toEqual('No');
            expect( control.get('radioGroup').at(2).get('label') ).toEqual('Maybe');
        });
    });

    describe('with checkboxfieldset', function() {
        beforeEach(function() {
            this.model = new wxApp.FormBuilderSubTab({
                config: {
                    formElements: [
                        {
                            controlTitle: "Multiple Choice",
                            control: "checkboxfieldset",
                            title: "Do you like me?",
                            checkboxGroup: [
                                {
                                    label: "Yes",
                                    control: "input",
                                    attributes: {
                                        type: "checkbox",
                                        name: ""
                                    },
                                    collectionId: "c246"
                                },
                                {
                                    label: "No",
                                    control: "input",
                                    attributes: {
                                        type: "checkbox",
                                        name: ""
                                    },
                                    collectionId: "c246"
                                },
                                {
                                    label: "Maybe",
                                    control: "input",
                                    attributes: {
                                        type: "checkbox",
                                        name: ""
                                    },
                                    collectionId: "c246"
                                }
                            ],
                            ordinal: 12,
                            advanced: false
                        }
                    ]
                }
            });
        });

        it('should be added to the form elements array', function() {
            expect( this.model.get('config').formElements.length ).toEqual(1);
        });

        it('should be of the correct class', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control instanceof wxApp.FormBuilderControlCheckboxFieldset ).toBeTruthy();
        });

        it('should have the correct data', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control.get('checkboxGroup').length ).toEqual(3);
            expect( control.get('checkboxGroup').at(0).get('label') ).toEqual('Yes');
            expect( control.get('checkboxGroup').at(1).get('label') ).toEqual('No');
            expect( control.get('checkboxGroup').at(2).get('label') ).toEqual('Maybe');
        });
    });

    describe('with select', function() {
        beforeEach(function() {
            this.model = new wxApp.FormBuilderSubTab({
                config: {
                    formElements: [
                        {
                            controlTitle: "Dropdown",
                            control: "select",
                            title: "What is your favourite colour",
                            optionGroup: [
                                {
                                    innerText: "Green",
                                    control: "option"
                                },
                                {
                                    innerText: "Magenta",
                                    control: "option"
                                },
                                {
                                    innerText: "Orange",
                                    control: "option"
                                },
                                {
                                    innerText: "White",
                                    control: "option"
                                },
                                {
                                    innerText: "Black",
                                    control: "option"
                                }
                            ],
                            ordinal: 13,
                            advanced: false
                        }
                    ]
                }
            });
        });

        it('should be added to the form elements array', function() {
            expect( this.model.get('config').formElements.length ).toEqual(1);
        });

        it('should be of the correct class', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control instanceof wxApp.FormBuilderControlSelect ).toBeTruthy();
        });

        it('should have the correct data', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control.get('optionGroup').length ).toEqual(5);
            expect( control.get('optionGroup').at(0).get('innerText') ).toEqual('Green');
            expect( control.get('optionGroup').at(1).get('innerText') ).toEqual('Magenta');
            expect( control.get('optionGroup').at(2).get('innerText') ).toEqual('Orange');
            expect( control.get('optionGroup').at(3).get('innerText') ).toEqual('White');
            expect( control.get('optionGroup').at(4).get('innerText') ).toEqual('Black');
        });
    });

    describe('with DocuSign Signature', function() {
        beforeEach(function() {
            this.model = new wxApp.FormBuilderSubTab({
                config: {
                    formElements: [
                        {
                            controlTitle: "DocuSign eSignature",
                            control: "docusignSignature",
                            label: "DocuSign Here",
                            instructions: "On completing this form your data will be presented back to you for review and signature.",
                            title: "Name, email and signature",
                            username: "",
                            password: "",
                            returnUrl: "",
                            attributes: {
                                required: "checked"
                            },
                            ordinal: 2
                        }
                    ]
                }
            });
        });

        it('should be added to the form elements array', function() {
            expect( this.model.get('config').formElements.length ).toEqual(1);
        });

        it('should be of the correct class', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control instanceof wxApp.FormBuilderControlDocusignSignature ).toBeTruthy();
        });

        it('should have the correct data', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control.get('label') ).toEqual('DocuSign Here');
            expect( control.get('instructions') ).toEqual('On completing this form your data will be presented back to you for review and signature.');
            expect( control.get('title') ).toEqual('Name, email and signature');
        });
    });

    describe('with Weever Signature', function() {
        beforeEach(function() {
            this.model = new wxApp.FormBuilderSubTab({
                config: {
                    formElements: [
                        {
                            controlTitle: "Weever eSignature",
                            control: "weeverSignature",
                            label: "Sign here",
                            instructions: "Tap the text above, then sign with your finger.",
                            title: "Please add your signature",
                            username: "",
                            password: "",
                            returnUrl: "",
                            attributes: {
                                required: "checked"
                            },
                            ordinal: 2
                        }
                    ]
                }
            });
        });

        it('should be added to the form elements array', function() {
            expect( this.model.get('config').formElements.length ).toEqual(1);
        });

        it('should be of the correct class', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control instanceof wxApp.FormBuilderControlWeeverSignature ).toBeTruthy();
        });

        it('should have the correct data', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control.get('label') ).toEqual('Sign here');
            expect( control.get('instructions') ).toEqual('Tap the text above, then sign with your finger.');
            expect( control.get('title') ).toEqual('Please add your signature');
        });
    });

    describe('with a calculation', function() {
        beforeEach(function() {
            this.model = new wxApp.FormBuilderSubTab({
                config: {
                    formElements: [
                        {
                            controlTitle: "Number",
                            label: "Price",
                            control: "input",
                            ordinal: 1,
                            attributes: {
                                type: "number"
                            }
                        },
                        {
                            controlTitle: "Number",
                            label: "Quantity",
                            control: "input",
                            ordinal: 2,
                            attributes: {
                                type: "number"
                            }
                        },
                        {
                            control: "calculation",
                            fields: [
                                {
                                    ordinal: "1",
                                    operation: "+",
                                    constant: 0
                                },
                                {
                                    ordinal: "2",
                                    operation: "*",
                                    constant: 0
                                }
                            ],
                            label: "Add calculators to your form-see the result",
                            ordinal: 3,
                            advanced: false
                        }
                    ]
                }
            });
        });

        it('should be added to the form elements array', function() {
            expect( this.model.get('config').formElements.length ).toEqual(3);
        });

        it('should be of the correct class', function() {
            var control1 = this.model.get('config').formElements.at(0);
            var control2 = this.model.get('config').formElements.at(1);
            var control3 = this.model.get('config').formElements.at(2);
            expect( control1 instanceof wxApp.FormBuilderControlInput ).toBeTruthy();
            expect( control2 instanceof wxApp.FormBuilderControlInput ).toBeTruthy();
            expect( control3 instanceof wxApp.FormBuilderCalculator ).toBeTruthy();
        });

        it('should have the correct data', function() {
            var control = this.model.get('config').formElements.at(2);
            expect( control.get('label') ).toEqual('Add calculators to your form-see the result');
            expect( control.get('fields').length ).toEqual(2);
            expect( control.get('fields').at(0).get('ordinal') ).toEqual('1');
            expect( control.get('fields').at(0).get('operation') ).toEqual('+');
        });
    });

    describe('with a hierarchical drop down list', function() {
        beforeEach(function() {
            this.model = new wxApp.FormBuilderSubTab({
                config: {
                    formElements: [
                        {
                            control: 'hierarchical-drop-down',
                            label  : 'What is your favourite movie?',
                            levels : 2,
                            titles : ['Genre', 'Movie'],
                            options: [
                                {
                                    text    : 'Horror',
                                    value   : 'Horror',
                                    children: [
                                        {
                                            text    : 'Evil Dead',
                                            value   : '',
                                            children: []
                                        },
                                        {
                                            text    : 'Army of Darkness',
                                            value   : '',
                                            children: []
                                        }
                                    ]
                                },
                                {
                                    text    : 'Sci-Fi',
                                    value   : 'Sci-Fi',
                                    children: [
                                        {
                                            text    : 'Star Wars',
                                            value   : '',
                                            children: []
                                        },
                                        {
                                            text    : 'Star Trek',
                                            value   : '',
                                            children: []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            });
        });

        it('should be added to the form elements array', function() {
            expect( this.model.get('config').formElements.length ).toEqual(1);
        });

        it('should be of the correct class', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control instanceof wxApp.FormBuilderHierarchicalDropDownList ).toBeTruthy();
        });

        it('should have the correct data', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control.get('levels') ).toEqual( 2 );
            expect( control.get('titles').length ).toEqual( 2 );
        });
    });

    describe('with a repeatable form', function() {
        beforeEach(function() {
            this.model = new wxApp.FormBuilderSubTab({
                config: {
                    formElements: [
                        {
                            control: 'repeatableform',
                            label  : 'What are your favourite movies?',
                            formElements: [
                                {
                                    controlTitle: "Single line text",
                                    label: "Movie Name",
                                    type: "text",
                                    control: "input",
                                    ordinal: 1,
                                    attributes: {
                                        type: "text",
                                        placeholder: "Movie Name"
                                    }
                                }
                            ]
                        }
                    ]
                }
            });
        });

        it('should be added to the form elements array', function() {
            expect( this.model.get('config').formElements.length ).toEqual(1);
        });

        it('should be of the correct class', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control instanceof wxApp.FormBuilderRepeatableForm ).toBeTruthy();
        });

        it('should have the correct data', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control.get('label') ).toEqual( 'What are your favourite movies?' );
            expect( control.get('formElements').length ).toEqual( 1 );
            expect( control.get('formElements').at(0) instanceof wxApp.FormBuilderControlInput ).toBeTruthy();
        });
    });


    describe('with a page break', function() {
        beforeEach(function() {
            this.model = new wxApp.FormBuilderSubTab({
                config: {
                    formElements: [
                        {
                            control:"pagebreak",
                            controlTitle: "Page Break",
                            ordinal: 13,
                            advanced: true
                        }
                    ]
                }
            });
        });

        it('should be added to the form elements array', function() {
            expect( this.model.get('config').formElements.length ).toEqual(1);
        });

        it('should be of the correct class', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control instanceof wxApp.FormBuilderControlPagebreak ).toBeTruthy();
        });
    });

    describe('with an input', function() {
        beforeEach(function() {
            this.model = new wxApp.FormBuilderSubTab({
                config: {
                    formElements: [
                        {
                            controlTitle: "Single line text",
                            label: "Movie Name",
                            type: "text",
                            control: "input",
                            ordinal: 1,
                            attributes: {
                                type: "text",
                                placeholder: "Movie Name"
                            }
                        }
                    ]
                }
            });
        });

        it('should be added to the form elements array', function() {
            expect( this.model.get('config').formElements.length ).toEqual(1);
        });

        it('should be of the correct class', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control instanceof wxApp.FormBuilderControlInput ).toBeTruthy();
        });

        it('should have the correct data', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control.get('label') ).toEqual( 'Movie Name' );
            expect( control.get('type') ).toEqual( 'text' );
            expect( control.get('attributes') ).toBeTruthy();
            expect( control.get('attributes') instanceof wxApp.FormBuilderControlAttributes ).toBeTruthy();
            // expect( control.get('attributes').get('text') ).toEqual( 'text' );
        });
    });

    describe('with an text slider', function() {
        beforeEach(function() {
            this.model = new wxApp.FormBuilderSubTab({
                config: {
                    formElements: [
                        {
                            controlTitle: "Text Slider",
                            label: "You can rate with a text slider",
                            type: "textSlider",
                            control: "input",
                            options: [
                                {
                                    text: "Great",
                                    control: "input",
                                    label: "Label",
                                    collectionId: "c401"
                                },
                                {
                                    text: "Okay",
                                    control: "input",
                                    label: "Label",
                                    collectionId: "c401"
                                },
                                {
                                    text: "Bad",
                                    control: "input",
                                    label: "Label",
                                    collectionId: "c401"
                                }
                            ],
                            ordinal: 15,
                            attributes: {
                                type: "range",
                                step: 1,
                                min: 0,
                                max: 2,
                                value: 1
                            }
                        }
                    ]
                }
            });
        });

        it('should be added to the form elements array', function() {
            expect( this.model.get('config').formElements.length ).toEqual(1);
        });

        it('should be of the correct class', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control instanceof wxApp.FormBuilderControlTextRange ).toBeTruthy();
        });

        it('should have the correct data', function() {
            var control = this.model.get('config').formElements.at(0);
            expect( control.get('label') ).toEqual( 'You can rate with a text slider' );
            expect( control.get('type') ).toEqual( 'textSlider' );
            expect( control.get('options') ).toBeTruthy();
            expect( control.get('options').length ).toEqual(3);
        });
    });

});