'use strict';

/* Controllers */

//angular.module('myApp.controllers', [])
angular.module('myApp.controllers')

.controller('positionController', 
              [ '$scope', '$mdToast', '$mdDialog', '$log', 'Restangular',
      function(  $scope,   $mdToast,   $mdDialog,   $log,   Restangular  ) {
        //Data de prueba
        
        $scope.view = {
            dataTable: [
                { "id": "570c9478-5fc8-4c33-82be-19184ada466c", "name": "Willie", "lastname": "Andrews", "email": "wandrews0@myspace.com", "direction": "4382 Hagan Drive" },
                { "id": "f74b4996-9d6f-4b1a-97c3-912c159d9c5b", "name": "Gloria", "lastname": "Nelson", "email": "gnelson1@youku.com", "direction": "09 Goodland Lane" },
                { "id": "39acb9d4-b313-472e-90f6-4afd8cf3cac3", "name": "Jeremy", "lastname": "Reyes", "email": "jreyes2@addthis.com", "direction": "94451 Talmadge Place" },
                { "id": "3aea0235-8381-49b7-b8e6-50113d0af988", "name": "Daniel", "lastname": "Gray", "email": "dgray3@dedecms.com", "direction": "36 Hagan Place" },
                { "id": "8099daf8-2210-4d34-9aaa-2e0d714503c4", "name": "Albert", "lastname": "Wood", "email": "awood4@state.gov", "direction": "29775 Hagan Way" },
                { "id": "edfc944b-f87e-438e-b122-05e95d7ed59a", "name": "Kevin", "lastname": "Tucker", "email": "ktucker5@pagesperso-orange.fr", "direction": "59762 Farmco Junction" },
                { "id": "346871de-6172-4baf-93aa-955282523038", "name": "Maria", "lastname": "Ferguson", "email": "mferguson6@mediafire.com", "direction": "8566 Fisk Trail" },
                { "id": "72afca23-368b-490a-95b6-6494202814ce", "name": "Charles", "lastname": "Grant", "email": "cgrant7@youtu.be", "direction": "726 Mariners Cove Point" },
                { "id": "98ea2793-4c82-4bad-98e9-d5dfff723fdf", "name": "Johnny", "lastname": "Thompson", "email": "jthompson8@google.ca", "direction": "08 Dahle Plaza" },
                { "id": "38e9f6f6-615e-4ff9-8c8a-06e0d1b24ae9", "name": "John", "lastname": "Olson", "email": "jolson9@earthlink.net", "direction": "71 Dapin Trail" },
                { "id": "d4d8e591-53ff-4261-a2fe-d5a37928458a", "name": "Virginia", "lastname": "Martin", "email": "vmartina@apache.org", "direction": "58304 Nancy Point" },
                { "id": "53703796-496f-4b93-8ec0-c92f783aa6bc", "name": "Carol", "lastname": "Gonzales", "email": "cgonzalesb@blogger.com", "direction": "522 Pankratz Lane" }
            ],
            order: {
                classification: 'lastname',
                orderby: '+'
            }
        };


        var baseAccounts = Restangular.all('positions');
        // This will query /accounts and return a promise.
        baseAccounts.getList({}).then(function(accounts) {
            //$scope.projects = accounts;
            $log.debug(accounts);
            $scope.item = accounts[0];

                //Do something
            
            
            //$scope.volontariList = users;
        });
   
        








        //Definicion de metodos
        $scope.ordenarPor = ordenarPor;
        $scope.clasificarPor = clasificarPor;
        $scope.abrirMenu = abrirMenu;
        $scope.mostrarDialogo = mostrarDialogo;
        
        
        //Referencia: http://tinyurl.com/p8ylr8n
        function generateUUID() {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c=='x' ? r : (r&0x3|0x8)).toString(16);
            });
            return uuid;
        }

        //Muestra un mensaje toast (funcion base)
        function simpleToastBase(message, position, delay, action) {
            $mdToast.show(
                $mdToast.simple()
                    .content(message)
                    .position(position)
                    .hideDelay(delay)
                    .action(action)
            );
        }

        //Muestra un mensaje toast de error
        function mostrarError(mensaje) {
            simpleToastBase(mensaje, 'bottom right', 6000, 'X');
        }

        //Ordena los elementos de forma ascendente o descendente
        function ordenarPor(sign) {
            $scope.view.order.orderby = sign;
        }

        //Ordena los elementos por nombre de propiedad
        function clasificarPor(field) {
            $scope.view.order.classification = field;
        }

        //Abre el menu de opciones
        function abrirMenu(mdOpenMenu, event) {
            mdOpenMenu(event);
        }


        //Muestra un cuadro de dialogo
        function mostrarDialogo(operacion, data, event) {
            //Guardando los datos a enviar


            console.log('mostrarDialogo');
            console.log(operacion);
            console.log(data);
            console.log(event);

/*
            var alert = $mdDialog.alert({
            title: 'Attention',
            content: 'This is an example of how easy dialogs can be!',
            ok: 'Close'
          });
          $mdDialog
            .show( alert )
            .finally(function() {
              alert = undefined;
            });

*/            

            var tempData = undefined;
            if (data === undefined) {
                tempData = {};
            } else {
                tempData = {
                    id: data.id,
                    name: data.name,
                    lastname: data.lastname,
                    email: data.email,
                    direction: data.direction
                };
            }
            $mdDialog.show({
                templateUrl: 'templates/positionsModal.html',
                targetEvent: event,
                clickOutsideToClose: false,
                locals: {
                    selectedItem: tempData,
                    dataTable: $scope.view.dataTable,
                    operacion: operacion
                },
                bindToController: true,
                controller: 'DialogController'
                //parent: angular.element(document.body) 
            })
            .then(
                function (result) {
                    mostrarError(result);
                }
            );

            

        }

}])

.controller('DialogController',

               ['$scope', '$mdDialog', 'operacion', 'selectedItem', 'dataTable',
        function($scope, $mdDialog, operacion, selectedItem, dataTable) {

            $scope.view = {
                dataTable: dataTable,
                selectedItem: selectedItem,
                operacion: 'Agregar'
            };

            //Determinando el tipo de operacion que es
            switch (operacion) {
                case 'C':
                    $scope.view.operacion = 'Agregar';
                    break;
                case 'UD':
                    $scope.view.operacion = 'Modificar';
                    break;
                case 'R':
                    $scope.view.operacion = 'Detalles';
                    break;
                default:
                    $scope.view.operacion = 'Detalles';
                    break;
            }

            //Metodos del controller del cuadro de dialogo
            $scope.regresar = regresar;
            $scope.guardar = guardar;
            $scope.borrar = borrar;


            //Regresa a la ventana principal sin realizar accion alguna
            function regresar() {
                $mdDialog.cancel();
            }


            //Selecciona la opcion de agregar un elemento nuevo o modificar uno existente
            function guardar() {
                if ($scope.view.selectedItem.id === undefined) agregar();
                else modificar();
            }

            //Permite agregar un nuevo elemento
            function agregar() {
                //Determinando si existe el elemento con el ID especificado
                var temp = _.find($scope.view.dataTable, function (x) { return x.id === $scope.view.selectedItem.id; });
                if (temp === undefined) {
                    //Generando ID para el nuevo elemento
                    $scope.view.selectedItem.id = generateUUID();
                    $scope.view.dataTable.push($scope.view.selectedItem);
                    $mdDialog.hide('Datos agregados con éxito');
                } else {
                    $mdDialog.hide('Ya están registrados los datos de la persona indicada');
                }
            }

            //Permite modificar un registro
            function modificar() {
                //Determinando si existe el elemento con el ID especificado
                var index = _.findIndex($scope.view.dataTable, { 'id': $scope.view.selectedItem.id });
                if (index !== -1) {
                    $scope.view.dataTable[index].name = $scope.view.selectedItem.name;
                    $scope.view.dataTable[index].lastname = $scope.view.selectedItem.lastname;
                    $scope.view.dataTable[index].email = $scope.view.selectedItem.email;
                    $scope.view.dataTable[index].direction = $scope.view.selectedItem.direction;
                    $mdDialog.hide('Datos modificados con éxito');
                } else {
                    $mdDialog.hide('No se pudo modificar los datos de la persona seleccionada');
                }
            }

            //Permite eliminar un registro
            function borrar() {
                var item = _.find($scope.view.dataTable, function (x) { return x.id === $scope.view.selectedItem.id; });
                if (item !== undefined) {
                    _.pull($scope.view.dataTable, item);
                    $mdDialog.hide('Datos borrados con éxito');
                } else {
                    $mdDialog.hide('No se pudo borrar los datos de la persona seleccionada');
                }
            }
}]);