export default ({ route, redirect }) => {
  if (route.path == '/' || route.name == 'timeline') {
    redirect('/timeline/recommended');
  }
}