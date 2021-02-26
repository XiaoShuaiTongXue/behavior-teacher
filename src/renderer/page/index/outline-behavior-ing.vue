<template>
  <!--线下课上检测-->
  <!-- bs-课上  -->
  <div class="content" id="offline_ing">
    <div class="container-fluid p-0">
    <el-alert v-if="success"
      title="成功提示的文案"
      type="success"
      center
      show-icon>
    </el-alert>
      <h1 class="h3 mb-3">线下行为检测</h1>
      <!-- <v-chart :options="polar"/> -->
      <!-- <v-chart :options="option"/> -->
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <!-- <h5 class="card-title">摄像机摄取画面</h5>
              <h6 class="card-subtitle text-muted">本产品将自动识别学生在课上学习过程中的 <code>不规范行为</code> ，以检测学生学习状态。 -->
              <!-- </h6> -->
            </div>
            <div class="table-responsive-1">
              <h2 class="text" style="text-align: center">摄像头放这里</h2>
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="card">
            <!-- <div class="card-header">
              <h5 class="card-title">检测提示</h5>
              <h6 class="card-subtitle text-muted">请按时开启行为检测功能！</h6>
            </div> -->
            <div class="card-body">
              <!-- <div class="mb-3">
                <div class="alert alert-primary alert-dismissible" role="alert">
                  <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div class="alert-icon">
                    <i class="far fa-fw fa-bell"></i>
                  </div>
                  <div class="alert-message">
                    <strong>运行成功！</strong> 系统将实时检测学生学习行为。
                  </div>
                </div>
                <div
                  class="alert alert-secondary alert-dismissible"
                  role="alert"
                >
                  <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div class="alert-icon">
                    <i class="far fa-fw fa-bell"></i>
                  </div>
                  <div class="alert-message">
                    <strong>运行失败！</strong>
                    若是技术或网络问题请及时向管理员反馈！
                  </div>
                </div> -->
                <div class="card-body text-center">
                  <div class="mb-3">
                    <button class="btn btn-pill btn-primary" @click="start">
                      开始检测
                    </button>
                    <button class="btn btn-pill btn-warning" >
                      结束检测
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">班级当前状态</h5>
              <!-- <h6 class="card-subtitle text-muted">
                该功能将会针对整个课堂表现，实时生成班级行为分析报告。
              </h6> -->
            </div>
            <div class="card-body">
              <div class="chart chart-sm">
                <v-chart :options="chartA" />
                <!-- <pre>
                书写次数 :{{ thisData.writeCount }}
                放置物体次数: {{ thisData.putBagCount }}
                玩手机次数: {{ thisData.playPhoneCount }}
                看纸条次数: {{ thisData.lookNoteCount }}
                传纸条次数: {{ thisData.passingNoteCount }}
                </pre> -->
                <!-- <canvas id="chartjs-pie_offline_study"></canvas> -->
              </div>
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="card flex-fill w-100">
            <div class="card-header">
              <h5 class="card-title">课堂情况趋势图</h5>
              <!-- <h6 class="card-subtitle text-muted">
                通过人工智能分析，自动评估学生课堂总体表现。
              </h6> -->
            </div>
            <div class="card-body">
              <div class="chart">
                <v-chart :options="chartB"/>
                <!-- <canvas id="chartjs-line_offline"></canvas> -->
              </div>
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">课堂总体情况</h5>
              <h6 class="card-subtitle text-muted">
                包含课堂总人数、整体参与度、认真度等数据分析。 <code>日期</code>
              </h6>
            </div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th style="width: 75%">数据分析</th>
                  <th>参数</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>课堂总人数：</td>
                  <td>{{ totalStudentNumber }}</td>
                </tr>
                <tr>
                  <td>整体参与度：</td>
                  <td>{{ totalParticipation }}</td>
                </tr>
                <tr>
                  <td>整体认真度：</td>
                  <td>{{ totalSeriousness }}</td>
                </tr>
                <tr>
                  <td>观测开始时间：</td>
                  <td>{{ startTime }}</td>
                </tr>
                <tr>
                  <td>观测总时长：</td>
                  <td>{{ totalTime }} 秒 </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">学生总体情况扇形图</h5>
              <h6 class="card-subtitle text-muted">
                具体分析每一位学生的行为状态，判断行为占比。
              </h6>
            </div>
            <div class="card-body">
              <div class="chart chart-sm">
                <v-chart :options="chartC"/>
                <!-- <canvas id="chartjs-pie_offline_class_study"></canvas> -->
              </div>
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">学生总体情况</h5>
              <h6 class="card-subtitle text-muted">
                包含书写总人次数、玩手机总人次数、传递纸条总人次数等数据分析。
                <code>日期</code>
              </h6>
            </div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th style="width: 75%">线下行为检测数据分析</th>
                  <th>参数</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>线下书写总人次数：</td>
                  <td>25</td>
                </tr>
                <tr>
                  <td>线下放包总人次数：</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>线下玩手机总人次数：</td>
                  <td>7</td>
                </tr>
                <tr>
                  <td>线下看纸条总人次数：</td>
                  <td>13</td>
                </tr>
                <tr>
                  <td>线下传递纸条总人次数：</td>
                  <td>6</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">学生个人行为扇形图</h5>
              <h6 class="card-subtitle text-muted">
                具体分析单个学生的行为状态，判断行为占比。
              </h6>
              <br />
              <div class="form-group row">
                <label class="col-form-label col-sm-2 text-sm-right"
                  >搜索：</label
                >
                <div class="col-sm-10">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="请输入学号"
                  />
                </div>
              </div>
            </div>

            <div class="card-body">
              <div class="chart chart-sm">
                <canvas id="chartjs-doughnut_offline_students"></canvas>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">学生单个情况</h5>
              <h6 class="card-subtitle text-muted">
                该功能将会针对单个学生的课堂表现，生成个人的分析报告。
                <code>日期</code>
              </h6>
            </div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th style="width: 75%">数据分析</th>
                  <th>参数</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>个人参与度：</td>
                  <td>0.6</td>
                </tr>
                <tr>
                  <td>个人认真度：</td>
                  <td>0.8</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>
<script>
import {csend} from '../../assets/js/c'
import { startlisten } from '../../assets/js/vue_listener'
import ECharts from 'vue-echarts'
import 'echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import { csend } from '../../assets/js/c'

let ss = 154

let canyvdu = [8, 10, 20, 15]
let renzhendu = [20, 30, 40, 50]

let writeCount = 25
let putBagCount = 2
let playPhoneCount = 5
let lookNoteCount = 8
let passingNoteCount = 1

let writeCountTotal = 90
let putBagCountTotal = 5
let playPhoneCountTotal = 10
let lookNoteCountTotal = 15
let passingNoteCountTotal = 17

let totalStudentNumber = 30
let totalParticipation = 99
let totalSeriousness = 99
// let startTime = '开始时间串'

export default {
  components: {
    'v-chart': ECharts
  },
  data () {
    return {
      totalTime: 0,
      startTime: '还未开始计时',
      ale: 'display:none',
      writeCount: writeCount,
      putBagCount: putBagCount,
      playPhoneCount: playPhoneCount,
      lookNoteCount: lookNoteCount,
      passingNoteCount: passingNoteCount,
      totalStudentNumber: totalStudentNumber,
      totalParticipation: totalParticipation,
      totalSeriousness: totalSeriousness,
      courseName: '',
      course: [],
      courseCount: '8',
      onlineBehavior: {
        behaviorStartTime: '暂无数据',
        behaviorEndTime: '暂无数据',
        sleepCount: 0,
        talkCount: 0,
        leaveCount: 0,
        outCount: 0,
        onlineStudents: []
      },
      behaviorChartData: [
        { value: 0, name: '睡觉次数' },
        { value: 735, name: '说话次数' },
        { value: 580, name: '走神次数' },
        { value: 484, name: '旷课次数' }
      ],
      onlineStudent: {
        sleepCount: 0,
        talkCount: 0,
        leaveCount: 0,
        outCount: 0,
        student: '暂无数据'
      },
      polar: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '学生总体情况',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: ss, name: '睡觉次数' },
              { value: 735, name: '说话次数' },
              { value: 580, name: '走神次数' },
              { value: 484, name: '旷课次数' },
              { value: 484, name: '旷课w次数' }
            ]
          }
        ]
      },
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legnd: {
          data: ['蒸发量', '降水量', '平均温度']
        },
        xAxis: [
          {
            type: 'category',
            data: ['睡觉', '说话', '走神', '旷课'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '次数',
            min: 0,
            max: 50,
            interval: 10,
            axisLabel: {
              formatter: '{value} 次'
            }
          },
          {
            type: 'value',
            name: '占比',
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '次数',
            type: 'bar',
            data: canyvdu
          },
          {
            name: '占比',
            type: 'line',
            yAxisIndex: 1,
            data: renzhendu
          }
        ]
      },
      chartA: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '学生总体情况',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: writeCount, name: '书写' },
              { value: putBagCount, name: '放置物体' },
              { value: playPhoneCount, name: '玩手机' },
              { value: lookNoteCount, name: '看纸条' },
              { value: passingNoteCount, name: '传纸条' }
            ]
          }
        ]
      },
      chartB: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legnd: {
          data: ['蒸发量', '降水量', '平均温度']
        },
        xAxis: [
          {
            type: 'category',
            data: ['0min', '5min', '10min', '15min', '20min'],
            // data: ['睡觉', '说话', '走神', '旷课'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '参与度',
            min: 0,
            max: 50,
            interval: 10,
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '认真度',
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '次数',
            type: 'line',
            data: [8, 10, 20, 15, 7]
          },
          {
            name: '占比',
            type: 'line',
            yAxisIndex: 1,
            data: [20, 30, 90, 50, 9]
          }
        ]
      },
      chartC: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '学生总体情况',
            type: 'pie',
            radius: ['0%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: writeCountTotal, name: '书写' },
              { value: putBagCountTotal, name: '放置物体' },
              { value: playPhoneCountTotal, name: '玩手机' },
              { value: lookNoteCountTotal, name: '看纸条' },
              { value: passingNoteCountTotal, name: '传纸条' }
            ]
          }
        ]
      }
    }
  },
  methods: {
    start () {
      var dt = new Date()
      this.startTime = dt.toLocaleString()
      this.ale = false
      this.timer = setInterval(this.add, 1000)
      startlisten(this)
      csend('offline_check_behavior_danger')
    },
    add () {
      this.totalTime = this.totalTime + 1
    }
  }
}
</script>
<style>
</style>
