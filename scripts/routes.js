angular.module('EmployeeCenter').
  config(['$routeProvider', function($routeProvider) {
      
    $routeProvider. 
    //Category Routes
    when('/contacts', {templateUrl:'views/contacts.html'}).
    when('/supplies', {templateUrl:'views/supplies.html'}).
    when('/orders', {templateUrl:'views/orders.html'}).
    when('/administrator', {templateUrl:'views/administrator.html'}).
    when('/products', {templateUrl: 'views/products.html'}).
    when('/accounting', {templateUrl:'views/accounting.html'}).

    //Model routes
    when('/models', {templateUrl: 'views/products/model/view_models.html', controller: ViewModelsCtrl}).
    when('/models/add', {templateUrl:'views/products/model/add_model.html', controller: AddModelCtrl}).
    when('/models/:id', {templateUrl:'views/products/model/model_details.html', controller: ModelDetailsCtrl}).
    //configuration routes
    when('/configurations', {templateUrl: 'views/view_configurations.html', controller: ViewConfigsCtrl}).
    when('/configurations/add_configuration', {templateUrl:'views/add_configuration.html', controller:AddConfigCtrl}).     
    //upholstery routes
    when('/upholstery', {templateUrl: 'views/products/upholstery/view_upholsteries.html', controller: ViewUpholCtrl}).
    when('/upholstery/add', {templateUrl:'views/products/upholstery/add_upholstery.html', controller:AddUpholsteryCtrl}).
    when('/upholstery/:id', {templateUrl:'views/products/upholstery/upholstery_details.html', controller:UpholDetailsCtrl}).
    //customer routes
    when('/customers/add', {templateUrl:'views/customer/add_customer.html', controller:AddCustomerCtrl}).
    when('/customers', {templateUrl:'views/customer/view_customers.html', controller:ViewCustomersCtrl}).
    when('/customers/:id', {templateUrl:'views/customer/customer_details.html', controller:CustomerDetailsCtrl}).
    //supplier routes
    when('/suppliers/add_supplier', {templateUrl:'views/supplier/add_supplier.html', controller:AddSupplierCtrl}).
    when('/suppliers', {templateUrl:'views/supplier/view_suppliers.html', controller:ViewSuppliersCtrl}).
    when('/suppliers/:id', {templateUrl:'views/supplier/supplier_details.html', controller:SupplierDetailCtrl}).
    //lumber routes
    when('/lumber', {templateUrl:'views/lumber/view_lumber.html', controller:ViewLumberCtrl}).
    when('/lumber/add_lumber', {templateUrl:'views/lumber/add_lumber.html', controller:AddLumberCtrl}).
    when('/lumber/:id', {templateUrl:'views/lumber/lumber_details.html', controller:LumberDetailsCtrl}).
    //foam routes
    when('/foam', {templateUrl:'views/foam/view_foam.html', controller:ViewFoamCtrl}).
    when('/foam/add_foam', {templateUrl:'views/foam/add_foam.html', controller:AddFoamCtrl}).
    when('/foam/:id', {templateUrl:'views/foam/foam_details.html', controller:FoamDetailsCtrl}).
    //foam routes
    when('/glue', {templateUrl:'views/glue/view_glue.html', controller:ViewGlueCtrl}).
    when('/glue/add', {templateUrl:'views/glue/add_glue.html', controller:AddGlueCtrl}).
    when('/glue/:id', {templateUrl:'views/glue/glue_details.html', controller:GlueDetailsCtrl}).
    //leg routes
    when('/legs/add_leg', {templateUrl:'views/legs/add_leg.html', controller:AddLegCtrl}).
    //screw routes
    when('/screws/add_screw', {templateUrl:'views/screws/add_screw.html', controller: AddScrewCtrl}).
    when('/screws', {templateUrl:'views/screws/view_screws.html', controller: ViewScrewsCtrl}).
    when('/screws/:id', {templateUrl:'views/screws/screw_details.html', controller: ScrewDetailsCtrl}).

    //staple routes
    when('/staple/add_staple', {templateUrl:'views/staple/add_staple.html', controller: AddStapleCtrl}).
    when('/staple', {templateUrl:'views/staple/view_staple.html', controller: ViewStaplesCtrl}).
    when('/staple/:id', {templateUrl:'views/staple/staple_details.html', controller: StapleDetailsCtrl}).
    //thread routes
    when('/thread/add_thread', {templateUrl:'views/thread/add_thread.html', controller: AddThreadCtrl}).
    when('/thread', {templateUrl:'views/thread/view_thread.html', controller: ViewThreadsCtrl}).
    when('/thread/:id', {templateUrl:'views/thread/thread_details.html', controller: ThreadDetailsCtrl}).
    //webbing routes
    when('/webbing/add_webbing', {templateUrl:'views/webbing/add_webbing.html', controller: AddWebbingCtrl}).
    when('/webbing', {templateUrl:'views/webbing/view_webbing.html', controller: ViewWebbingsCtrl}).
    when('/webbing/:id', {templateUrl:'views/webbing/webbing_details.html', controller: WebbingDetailsCtrl}).
    //wool routes
    when('/wool/add_wool', {templateUrl:'views/wool/add_wool.html', controller: AddWoolCtrl}).
    when('/wool', {templateUrl:'views/wool/view_wool.html', controller: ViewWoolCtrl}).
    when('/wool/:id', {templateUrl:'views/wool/wool_details.html', controller: WoolDetailsCtrl}).
    //fabric routes
    when('/fabric/add_fabric', {templateUrl:'views/fabric/add_fabric.html', controller: AddFabricCtrl}).
    when('/fabric', {templateUrl:'views/fabric/view_fabrics.html', controller: ViewFabricsCtrl}).
    when('/fabric/:id', {templateUrl:'views/fabric/fabric_details.html', controller: FabricDetailsCtrl}).
     //zipper routes
    when('/zipper/add_zipper', {templateUrl:'views/zipper/add_zipper.html', controller: AddZipperCtrl}).
    when('/zipper', {templateUrl:'views/zipper/view_zipper.html', controller: ViewZipperCtrl}).
    when('/zipper/:id', {templateUrl:'views/zipper/zipper_details.html', controller: ZipperDetailsCtrl}).
    
    /*
     * This section deals with orders
     */
    //purhcase order routes
    when('/purchase_order', {templateUrl:'views/purchase_order/view.html', controller:ViewPOCtrl}).
    when('/purchase_order/create', {templateUrl:'views/purchase_order/create.html', controller:CreatePOCtrl}).
    
    //Acknowledgements
    when('/acknowledgement', {templateUrl:'views/acknowledgement/view.html', controller:ViewAcknowledgementCtrl}).
    when('/acknowledgement/create', {templateUrl:'views/acknowledgement/create.html', controller:CreateAcknowledgementCtrl}).
    when('/acknowledgement/:id', {templateUrl:'views/acknowledgement/details.html', controller: AcknowledgementDetailsCtrl}).
    //Shipping
    when('/shipping', {templateUrl:'views/shipping/view_shipping.html', controller:ViewShippingCtrl}).
    when('/shipping/create', {templateUrl:'views/shipping/create_shipping.html', controller:CreateShippingCtrl}).
    when('/shipping/deliveries/week', {templateUrl:'views/shipping/weekly.html', controller:WeeklyDeliveriesCtrl}).
    when('/shipping/deliveries/today', {templateUrl:'views/shipping/today.html', controller:TodayDeliveryCtrl}).
    //Transactions
    when('/transaction', {templateUrl:'views/transaction/view.html', controller:ViewTransactionsCtrl}).
    when('/transaction/add', {templateUrl:'views/transaction/add.html', controller:AddTransactionCtrl}).
    /*
     * this area deals with all the urls for the admin section of thes site
     */
    //Permissions
    when('/permissions', {templateUrl:'views/permissions/view_permissions.html', controller:ViewPermissionsCtrl}).
    //Groups
    when('/groups', {templateUrl:'views/groups/view_groups.html', controller:ViewGroupsCtrl}).
    when('/groups/add_group', {templateUrl:'views/groups/add_group.html', controller:AddGroupCtrl}).
    when('/groups/:id', {templateUrl:'views/groups/group_details.html', controller:GroupDetailsCtrl}).
    //Users
    when('/users', {templateUrl:'views/users/view_users.html', controller:ViewUsersCtrl}).
    when('/users/add_user', {templateUrl:'views/users/add_user.html', controller:AddUserCtrl}).
    when('/users/:id', {templateUrl:'views/users/user_details.html', controller:UserDetailsCtrl}).
    
    /*
     * This area deals with all the permissions
     */
    when('/settings/change_password', {templateUrl:'views/settings/change_password.html', controller:ChangePasswordCtrl}).
    
    /*
     * Deals with the photo library
     */
    when('/library', {templateUrl:'views/library/view.html', controller:ViewLibraryCtrl})
  }]);