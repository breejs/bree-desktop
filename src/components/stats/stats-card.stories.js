import StatsCard from './stats-card.vue';

const config = {
  title: 'Components/Stats/Stats Card',
  component: StatsCard
};
export default config;

const Template = (args) => ({
  components: { StatsCard },
  setup() {
    return { args };
  },
  template: '<StatsCard v-bind="args" />'
});

export const Primary = Template.bind({});
Primary.args = {
  title: 'Total Done',
  value: 1234,
  icon: 'check',
  color: 'primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  color: 'secondary'
};

export const Success = Template.bind({});
Success.args = {
  ...Primary.args,
  color: 'success'
};

export const Danger = Template.bind({});
Danger.args = {
  ...Primary.args,
  color: 'danger'
};

export const Warning = Template.bind({});
Warning.args = {
  ...Primary.args,
  color: 'warning'
};

export const Info = Template.bind({});
Info.args = {
  ...Primary.args,
  color: 'info'
};

export const Light = Template.bind({});
Light.args = {
  ...Primary.args,
  color: 'light'
};

export const Dark = Template.bind({});
Dark.args = {
  ...Primary.args,
  color: 'dark'
};
