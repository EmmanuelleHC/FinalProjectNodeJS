/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('/healthz', async ({ response }) => {
  const isLive = await HealthCheck.isLive()

  return isLive
    ? response.status(200).send({})
    : response.status(400).send({})
})




Route.group(()=>{

Route.post('/register','AuthController.register').as('register');
Route.post('/login','AuthController.login').as('login');
Route.post('/otp_confirmation','AuthController.otp_confirmation').as('confirmation');


Route.resource('venues','VenuesController').only(['index', 'store', 'show', 'update']).as('venues').middleware(['auth','role:owner']);
Route.post('/venues/:id/bookings','VenuesController.book').as('book').middleware(['auth','role:user']);




Route.resource('fields','FieldsController').only(['index', 'store', 'show', 'update']).as('fields').middleware(['auth','role:owner']);


Route.resource('bookings','FieldsController').only(['index', 'show']).as('bookings').middleware({'*':'auth'});
Route.get('/schedules','BookingsController.schedules').as('schedules').middleware('auth');
Route.put('/bookings/:id/join','BookingsController.join').as('join').middleware(['auth','role:user']);
Route.put('/bookings/:id/unjoin','BookingsController.unjoin').as('unjoin').middleware(['auth','role:user']);



}).prefix('/api/v1').as('apiv1')

