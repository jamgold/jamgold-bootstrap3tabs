Bootstrap3Tab = function() {
	var members = ['name', 'title', 'body', 'module'];
	if(arguments.length>0)
	{
		for(var i=0;i<arguments.length;i++)
		{
			if(typeof arguments[i] == 'string')
			{
				if(i<=members.length){
					this[members[i]] = arguments[i];
				} else {
					console.log('Bootstrap3Tab: we do not know where to put this', arguments[1]);
				}
			}
			else
			{
				// console.log('need to parse', arguments[i]);
				//
				// turn expanded into active
				//
				for(var n in arguments[i])
				{
					var v = arguments[i][n];
					if(n == 'expanded') n = 'active'
					if(n in this) this[n] = v;
					else console.log('Bootstrap3Tab: unknown member', n);
				}
				// console.log('Bootstrap3Tab', this);
			}
		}
	}
	//
	// active needs to be the classname active if true
	//
	this.active = this.active ? 'active' : '';
};
Bootstrap3Tab.prototype = {
  name: '',
  title: '',
  body: '',
  active: '', // classname
  template: false,
  module: null,
  mobileUrl: ''
};
Bootstrap3Tabs = function(name) {
	if(name === undefined) throw new Meteor.error('500','Bootstrap3Tabs needs a name');
	this.name = name;
	// console.log('Bootstrap3Tabs',arguments.length, arguments);
	if(arguments.length>=1)
	{
		for(var i=1;i<arguments.length;i++)
		{
			var tab = arguments[i];
			// console.log(typeof tab);
			this.add(new Bootstrap3Tab(tab));
		}
	}
};
Bootstrap3Tabs.prototype = {
	name: 'Bootstrap3Tabs',
	tabs: [],
	active: '',
	add: function(tab) {
		// console.log('Bootstrap3Tabs.add', typeof tab, tab, this);
		this.tabs.push(tab);
	}
};
Template.Bootstrap3Tabs.onCreated(function Bootstrap3TabsOnCreated(){
	const instance = this;
	instance.activeTab = new ReactiveVar('');
	instance.tabTemplate = new ReactiveVar('');
	instance.tabs = instance.data.tabs;
	instance.findTemplate = function(tab) {
		// console.log(`findTemplate ${tab}`)
		var useTemplate = null;
		for(var i in instance.tabs)
		{
			var tt = instance.tabs[i];
			if(tt.name == tab && 'template' in tt && tt.template)
				useTemplate = tt.template;
		}
		return useTemplate;
	}
});
Template.Bootstrap3Tabs.onRendered(function Bootstrap3TabsOnRendered(){
	const instance = this;
	// instance.tabs = instance.data.tabs;
	instance.$('a[role="tab"]').on('shown.bs.tab', function(e) {
		var tab = e.currentTarget.attributes.getNamedItem('aria-controls').value;
		var useTemplate = instance.findTemplate(tab);
		instance.activeTab.set(tab);
		instance.tabTemplate.set(useTemplate);
	});
	instance.$('li.active a[role="tab"]').each(function(){
		var tab = this.attributes.getNamedItem('aria-controls').value;
		var useTemplate = instance.findTemplate(tab);
		instance.activeTab.set(tab);
		instance.tabTemplate.set(useTemplate);
		// console.log(template.view.name+'.rendered '+tab+' '+useTemplate);
	});
});
Template.Bootstrap3Tabs.helpers({
	activeTab: function Bootstrap3TabsActiveTab() {
		const instance = Template.instance();
		return instance.activeTab.get();
	},
	tabIsTemplate: function Bootstrap3TabsTabIsTemplate() {
		// const instance = Template.instance();
		// var activeTab = instance.activeTab.get();
		var isTemplate = 'template' in this && this.template;
		// console.log('tabIsTemplate', isTemplate, this);
		return isTemplate;
	},
	//
	// this is where we could make it dynamic
	//
	activeTemplate: function Bootstrap3TabsActiveTemplate() {
		const instance = Template.instance();
		var tabTemplate = instance.tabTemplate.get();
		// console.log(`activeTemplate ${tabTemplate}`);
		return tabTemplate;
	}
});
