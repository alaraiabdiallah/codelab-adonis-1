'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.resource('provinces', 'ProvinceController').apiOnly()
.middleware(new Map([
  [
    ['provinces.store', 'provinces.update', 'provinces.delete'],
    ['auth']
  ]
])).validator(new Map([
  [
    ['provinces.store','provinces.update'], ['StoreProvince']
  ],
]))

Route.patch('/users/me', 'UserController.selfUpdate')
  .middleware(['auth']).as('users.selfUpdate')

Route.get('/users/me', 'UserController.showMe')
  .middleware(['auth']).as('users.me')

Route.resource('users', 'UserController').apiOnly()
  .middleware(new Map([
    [
      ['users.store', 'users.update', 'users.delete'],
      ['auth','adminRole']
    ]
  ]))

Route.get('/positions/:id/users', 'PositionController.showUsers')
    .middleware(['auth', 'adminRole']).as('positions.users')

Route.resource('positions', 'PositionController').apiOnly()
  .middleware(['auth','adminRole'])


Route.group(() => {
    Route.resource('cities', 'CityController').apiOnly().middleware(new Map([
      [
        ['cities.store', 'cities.update', 'cities.delete'],
        ['auth']
      ]
    ]))
}).prefix('provinces/:province_id').middleware('checkProvince')

Route.group(() => {
  Route.resource('positions', 'UserPositionController').apiOnly().middleware(new Map([
    [
      ['positions.store', 'positions.update', 'positions.delete'],
      ['auth']
    ]
  ]))
}).prefix('users/:user_id')


Route.post('login','AuthController.login')
Route.post('register','AuthController.register')