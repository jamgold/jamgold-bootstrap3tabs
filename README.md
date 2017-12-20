# Bootstrap 3 Tab interface
simple module to create Bootstrap 3 tabs

```
Template.tabTest.onCreated(function(){
  var template = this;
  template.state = new ReactiveVar();
});
Template.tabTest.helpers({
 myTabs(){
	var active = Template.instance().state.get();
  return [
    new Bootstrap3Tab({name: 'tab1', title: 'Tab 1', template: 'templateTab1', active: active == 'tab1'}),
    new Bootstrap3Tab({name: 'tab2', title: 'Tab 2', template: 'templateTab2', active: active == 'tab2'}),
  ]
 },
 state(){
  return Template.instance().state.get();
 }
});
```

```
<template name="templateTab1">
 Tab 1
</template>
<template name="templateTab2">
 Tab 2
</template>
<template name="tabTest">
  {{>Bootstrap3Tabs tabs=myTabs state=state}}`
</template>
```
