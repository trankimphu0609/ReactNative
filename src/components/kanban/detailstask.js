import axios from 'axios';
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import StatusBar from '../status_bar';
import TextInformation from './textinformation';
import TextInformationDay from './textInformationday';
import TextInformationStar from './textInformationstar';
import TextInformationCheckbox from './textInformationCheckbox';
const URL_project = 'https://uat.xboss.com/web/dataset/call_kw';

class DetailsTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listdetailstask: [],
    };
  }
  async componentDidMount() {
    const {id} = this.props.route.params;
    console.log('id=', id);
    let res = await axios.post(URL_project, {
      params: {
        model: 'project.task',
        method: 'read',
        args: [
          [id],
          [
            'stage_id',
            'subtask_count',
            'rating_count',
            'sale_order_id',
            'purchase_order_id',
            'count_sla_log',
            'checklist_progress_rate',
            'active',
            'detail_plan_count',
            'task_number',
            'name',
            'kanban_state',
            'project_id',
            'project_phase_id',
            'team_id',
            'user_id',
            'assigned_ids',
            'percent_done',
            'planned_date_begin',
            'planned_date_end',
            'effort',
            'supporter_id',
            'creator_id',
            'members',
            'need_install',
            'privacy_visibility',
            'purchase_line_id',
            'sale_line_id',
            'billable_type',
            'is_project_map_purchase_empty',
            'is_project_map_empty',
            'use_milestones',
            'milestone_id',
            'legend_blocked',
            'legend_normal',
            'legend_done',
            'date_deadline',
            'task_level_id',
            'priority',
            'tag_ids',
            'scheduling_mode',
            'constraint_type',
            'constraint_date',
            'effort_driven',
            'manually_scheduled',
            'option',
            'product_backlog_id_domain',
            'product_backlog_id',
            'is_scrum',
            'sprint_id',
            'release_id',
            'type_id',
            'date_finished',
            'description',
            'use_pad',
            'description_pad',
            'checklist_task_instance_ids',
            'task_checklists',
            'has_checklist_task_instance_ids',
            'analytic_account_active',
            'allow_timesheets',
            'planned_hours',
            'subtask_planned_hours',
            'progress',
            'timesheet_ids',
            'effective_hours',
            'subtask_effective_hours',
            'total_hours_spent',
            'remaining_hours',
            'sequence',
            'partner_id',
            'email_from',
            'email_cc',
            'parent_id',
            'child_ids',
            'subtask_project_id',
            'company_id',
            'displayed_image_id',
            'date_start',
            'date_end',
            'date_assign',
            'date_last_stage_update',
            'working_hours_open',
            'working_days_open',
            'working_hours_close',
            'working_days_close',
            'meeting_id',
            'fixed_calc_type',
            'plan_duration',
            'duration',
            'detail_plan_work',
            'duration_scale',
            'duration_work_scale',
            'duration_picker',
            'on_gantt',
            'is_milestone',
            'schedule_mode',
            'constrain_type',
            'constrain_date',
            'color_gantt_set',
            'name',
            'color_gantt',
            'summary_date_start',
            'summary_date_end',
            'detail_plan',
            'predecessor_ids',
            'task_resource_ids',
            'info_ids',
            'contributor_ids',
            'incidents',
            'message_follower_ids',
            'activity_ids',
            'message_ids',
            'message_attachment_count',
            'reference_count',
            'can_have_reference',
            'display_name',
          ],
        ],
        kwargs: {},
      },
    });
    this.setState({
      listdetailstask:
        res && res.data && res.data.result ? res.data.result : [],
    });
  }

  render() {
    let {listdetailstask} = this.state;
    return (
      <View style={style.container}>
        <StatusBar />
        {listdetailstask.map(item => {
          console.log('item', item);
          return (
            <View style={{height: '90%', flex: 1}}>
              <ScrollView>
                <View>
                  <Text style={style.textheader}>{item.task_number}</Text>
                  <Text style={style.textheader}>{item.name}</Text>
                </View>
                <TextInformation />
                <View>
                  <TextInformation
                    textLeft={'Project'}
                    textRight={item.project_id[1]}
                  />
                  <TextInformation
                    textLeft={'Project Phase'}
                    textRight={item.project_phase_id[1]}
                  />
                  <TextInformation
                    textLeft={'Assigned Team'}
                    textRight={item.team_id[1]}
                  />
                  <TextInformation
                    textLeft={'Assigned To'}
                    textRight={item.user_id[1]}
                  />
                  <TextInformation
                    textLeft={'Assigned Resources'}
                    textRight={''}
                  />
                  <TextInformation
                    textLeft={'Done %'}
                    textRight={item.percent_done}
                  />
                  <TextInformationDay
                    textLeft={'Start Date'}
                    day={item.planned_date_begin}
                  />
                  <TextInformationDay
                    textLeft={'End Date'}
                    day={item.planned_date_end}
                  />
                  <TextInformation
                    textLeft={'Effort (Hours)'}
                    textRight={item.effort}
                  />
                  <TextInformation
                    textLeft={'Supporter'}
                    textRight={item.supporter_id[1]}
                  />
                  <TextInformation
                    textLeft={'Reported By'}
                    textRight={item.creator_id[1]}
                  />
                  <TextInformation
                    textLeft={'Need Install'}
                    textRight={item.need_install}
                  />
                  <TextInformation
                    textLeft={'Milestones'}
                    textRight={item.milestone_id[1]}
                  />
                  <TextInformationDay
                    textLeft={'Deadline'}
                    day={item.date_deadline}
                  />
                  <TextInformation
                    textLeft={'Task Level'}
                    textRight={item.task_level_id[1]}
                  />
                  <TextInformationStar
                    textLeft={'Priority'}
                    textRight={item.priority}
                  />
                  <TextInformation textLeft={'Tags'} textRight={''} />
                  <TextInformation
                    textLeft={'Scheduling Mode'}
                    textRight={item.scheduling_mode}
                  />
                  <TextInformation
                    textLeft={'Constraint Type'}
                    textRight={item.constraint_type}
                  />
                  <TextInformationDay
                    textLeft={'Constraint Date'}
                    day={item.constraint_date}
                  />
                  <TextInformationCheckbox
                    textLeft={'Effort Driver'}
                    textRight={item.effort_driven}
                  />
                  <TextInformationCheckbox
                    textLeft={'Manually Schaduled'}
                    textRight={item.manually_scheduled}
                  />
                  <TextInformation
                    textLeft={'Option'}
                    textRight={item.option}
                  />
                  <TextInformation
                    textLeft={'Reaquest'}
                    textRight={item.product_backlog_id[1]}
                  />
                  <TextInformation
                    textLeft={'Sprint'}
                    textRight={item.sprint_id[1]}
                  />
                  <TextInformation
                    textLeft={'Request'}
                    textRight={item.release_id[1]}
                  />
                  <TextInformation
                    textLeft={'Type'}
                    textRight={item.type_id[1]}
                  />
                  <TextInformationDay
                    textLeft={'Done Date'}
                    day={item.date_finished}
                  />
                </View>
              </ScrollView>
            </View>
          );
        })}
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  textheader: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'bold',
  },
});

export default DetailsTask;
