"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_platforms_player_player_routes_ts"],{

/***/ 3276:
/*!***************************************************!*\
  !*** ./src/app/platforms/player/player.routes.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   routes: () => (/* binding */ routes)
/* harmony export */ });
const routes = [{
  path: '',
  loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_ionicons_dist_esm-es5_index-b72adede_js-node_modules_ionicons_icons_index_mjs"), __webpack_require__.e("src_app_platforms_player_layout_player-layout_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./layout/player-layout.page */ 8695)).then(m => m.PlayerLayoutPage),
  children: [{
    path: 'dashboard',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_ionicons_dist_esm-es5_index-b72adede_js-node_modules_ionicons_icons_index_mjs"), __webpack_require__.e("common"), __webpack_require__.e("src_app_platforms_player_pages_dashboard_dashboard_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/dashboard/dashboard.page */ 6378)).then(m => m.DashboardPage)
  }, {
    path: 'matches',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_ionicons_dist_esm-es5_index-b72adede_js-node_modules_ionicons_icons_index_mjs"), __webpack_require__.e("src_app_platforms_player_pages_matches_matches_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/matches/matches.page */ 9402)).then(m => m.MatchesPage)
  }, {
    path: 'predictions',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_ionicons_dist_esm-es5_index-b72adede_js-node_modules_ionicons_icons_index_mjs"), __webpack_require__.e("default-src_app_core_services_mock-data_service_ts"), __webpack_require__.e("src_app_platforms_player_pages_predictions_predictions_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/predictions/predictions.page */ 4946)).then(m => m.PredictionsPage)
  }, {
    path: 'standings',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_ionicons_dist_esm-es5_index-b72adede_js-node_modules_ionicons_icons_index_mjs"), __webpack_require__.e("default-src_app_core_services_group_service_ts"), __webpack_require__.e("src_app_platforms_player_pages_standings_standings_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/standings/standings.page */ 3694)).then(m => m.StandingsPage)
  }, {
    path: 'group-standings/:groupId',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_ionicons_dist_esm-es5_index-b72adede_js-node_modules_ionicons_icons_index_mjs"), __webpack_require__.e("default-src_app_core_services_group_service_ts"), __webpack_require__.e("src_app_platforms_player_pages_group-standings_group-standings_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/group-standings/group-standings.page */ 4794)).then(m => m.GroupStandingsPage)
  }, {
    path: 'join-group',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_ionicons_dist_esm-es5_index-b72adede_js-node_modules_ionicons_icons_index_mjs"), __webpack_require__.e("default-src_app_core_services_group_service_ts"), __webpack_require__.e("src_app_platforms_player_pages_join-group_join-group_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/join-group/join-group.page */ 8044)).then(m => m.JoinGroupPage)
  }, {
    path: 'settings',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_ionicons_dist_esm-es5_index-b72adede_js-node_modules_ionicons_icons_index_mjs"), __webpack_require__.e("src_app_platforms_player_pages_settings_settings_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/settings/settings.page */ 3186)).then(m => m.SettingsPage)
  }, {
    path: 'groups',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_ionicons_dist_esm-es5_index-b72adede_js-node_modules_ionicons_icons_index_mjs"), __webpack_require__.e("default-src_app_core_services_group_service_ts"), __webpack_require__.e("src_app_platforms_player_pages_groups_groups_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/groups/groups.page */ 9292)).then(m => m.GroupsPage)
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }]
}];

/***/ })

}]);
//# sourceMappingURL=src_app_platforms_player_player_routes_ts.js.map