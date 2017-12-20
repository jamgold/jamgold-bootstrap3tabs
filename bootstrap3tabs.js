// Write your package code here!
Bootstrap3Tab = function() {
	var members = ['name', 'title', 'body'];
	if(arguments.length>0)
	{
		for(var i=0;i<arguments.length;i++)
		{
			if(typeof arguments[i] == 'string')
			{
				if(i<=members.length)
					this[members[i]] = arguments[i];
				else
					console.log('Bootstrap3Tab: we do not know where to put this', arguments[1]);
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
			}
		}
	}
	//
	// active needs to be the classname active if true
	//
	this.active = this.active ? 'active' : '';
}
Bootstrap3Tab.prototype = {
  name: '',
  title: '',
  body: '',
  active: '', // classname
  template: false,
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
}

Bootstrap3Tabs.prototype = {
	name: 'Bootstrap3Tabs',
	tabs: [],
	active: '',
	add: function(tab) {
		// console.log('Bootstrap3Tabs.add', typeof tab, tab, this);
		this.tabs.push(tab);
	}
}
Template.Bootstrap3Tabs.onCreated(function(){
	var template = this;
	template.activeTab = new ReactiveVar('');
	template.tabTemplate = new ReactiveVar('');
	template.tabs = [];
	template.findTemplate = function(tab) {
		var useTemplate = null;
		for(var i in template.tabs)
		{
			var tt = template.tabs[i];
			if(tt.name == tab && 'template' in tt && tt.template)
				useTemplate = tt.template;
		}
		return useTemplate;
	}
});
Template.Bootstrap3Tabs.onRendered(function(){
	var template = this;
	template.tabs = template.data.tabs;
	template.$('a[role="tab"]').on('shown.bs.tab', function(e) {
		var tab = e.currentTarget.attributes.getNamedItem('aria-controls').value;
		var useTemplate = template.findTemplate(tab);
		template.activeTab.set(tab);
		template.tabTemplate.set(useTemplate);
	});
	template.$('li.active a[role="tab"]').each(function(){
		var tab = this.attributes.getNamedItem('aria-controls').value;
		var useTemplate = template.findTemplate(tab);
		template.activeTab.set(tab);
		template.tabTemplate.set(useTemplate);
		// console.log(template.view.name+'.rendered '+tab+' '+useTemplate);
	});
});
Template.Bootstrap3Tabs.helpers({
	activeTab: function() {
		var template = Template.instance();
		return template.activeTab.get();
	},
	tabIsTemplate: function() {
		var template = Template.instance();
		// var activeTab = template.activeTab.get();
		var isTemplate = 'template' in this && this.template;
		// console.log('tabIsTemplate', isTemplate, this);
		return isTemplate;
	},
	activeTemplate: function() {
		var template = Template.instance();
		var tabTemplate = template.tabTemplate.get();
		// console.log('activeTemplate', tabTemplate);
		return tabTemplate;
	}
});
