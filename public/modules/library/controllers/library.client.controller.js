'use strict';

// Tracks controller
angular.module('library')
    .controller('LibraryController', ['$scope', '$stateParams', '$location', 'Authentication', 'Tracks',
        function($scope, $stateParams, $location, Authentication, Tracks) {
            $scope.authentication = Authentication;

            // Find a list of Tracks
            $scope.find = function() {
                $scope.tracks = Tracks.query();
            };

            // Find existing Track
            $scope.findOne = function() {
                $scope.track = Tracks.get({
                    trackId: $stateParams.trackId
                });
            };

            $scope.rowCollection = [
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
                {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
            ];
        }
    ]);
