<template>
  <!--线上行为检测-->
  <div class="content" id="online_behaviorPage">
    <div class="container-fluid p-0">
      <br>
      <br>
      <h1 class="h3 mb-3">行为检测分析报告</h1>

      <div class="row">
        <div class="col-12 col-xl-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">选择查询课程信息</h5>
              <h6 class="card-subtitle text-muted">请选择课程和日期，查询当堂课的具体行为信息</h6>
            </div>
            <table class="table table-striped">
              <thead>
              <tr>
                <th style="width:50%;">线上行为检测查询数据</th>
                <th>参数</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>课堂名称：</td>
                <td>
                  <el-select v-model="courseName" placeholder="请选择课程名称" @change="getBehaviors">
                    <el-option
                        v-for="item in courses"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                  </el-select>
                </td>
              </tr>
              <tr v-if="courseName">
                <td>检测开始时间：</td>
                <td>
                  <el-select v-model="onlineBehavior" value-key="behaviorStartTime" placeholder="请选择开始时间"
                             @change="updateBehavior">
                    <el-option
                        v-for="item in onlineBehaviors"
                        :key="item.id"
                        :label="item.behaviorStartTime"
                        :value="item">
                    </el-option>
                  </el-select>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-12 col-xl-6" v-if="state">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">课程相关信息</h5>
            </div>
            <table class="table table-striped">
              <thead>
              <tr>
                <th style="width:50%;">线上行为检测信息</th>
                <th>数据</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>课堂总人数：</td>
                <td>{{ courseCount }}</td>
              </tr>
              <tr>
                <td>检测持续时长：</td>
                <td>{{ last }}</td>
              </tr>
              <tr>
                <td>检测结束时间：</td>
                <td>{{ onlineBehavior.behaviorEndTime }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-12" v-if="state">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">线上行为检测时间趋势图</h5>
              <h6 class="card-subtitle text-muted">
                线上行为检测以3分钟为间隔，统计每段时间间隔内，各种行为的统计量
              </h6>
            </div>
            <v-chart :options="timePolar" style="width: 900px;height: 500px" key="111" id="time-output-chart"/>
          </div>
        </div>
        <div class="col-12 col-xl-6" v-if="state">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">学生总体情况</h5>
              <h6 class="card-subtitle text-muted">包含书写总人次数、玩手机总人次数、传递纸条总人次数等数据分析。
              </h6>
            </div>
            <table class="table table-striped">
              <thead>
              <tr>
                <th style="width:60%;">线上行为检测数据</th>
                <th>参数</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>线上睡觉总人次数：</td>
                <td>{{ onlineBehavior.sleepCount }}次</td>
              </tr>
              <tr>
                <td>线上说话总人次数：</td>
                <td>{{ onlineBehavior.talkCount }}次</td>
              </tr>
              <tr>
                <td>线上旷课总人次数：</td>
                <td>{{ onlineBehavior.outCount }}次</td>
              </tr>
              <tr>
                <td>线上走神总人次数：</td>
                <td>{{ onlineBehavior.leaveCount }}次</td>
              </tr>
              </tbody>
            </table>
            <v-chart style="width: 450px;height: 250px" :options="polar" key="112"/>
          </div>
        </div>
        <div class="col-12 col-xl-6" v-if="state">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">学生单个情况</h5>
              <h6 class="card-subtitle text-muted">您可以选择本次课程中的所有学生，查看学生的具体行为信息</h6>
            </div>
            <table class="table table-striped">
              <thead>
              <tr>
                <th style="width:60%;">个人线上行为检测数据</th>
                <th>参数</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>学生姓名：</td>
                <td>
                  <el-select v-model="index" placeholder="学生姓名" value-key="student" @change="updateStudentBehavior">
                    <el-option
                        v-for="(onlineStudent,index) in onlineBehavior.onlineStudents"
                        :key="index"
                        :label="onlineStudent.student"
                        :value="index">
                    </el-option>
                  </el-select>
                </td>
              </tr>
              <tr v-show="index !== null">
                <td>认真度：</td>
                <td>{{ onlineStudent.studyPro }}%</td>
              </tr>
              <tr v-show="index !== null">
                <td>参与度：</td>
                <td>{{ onlineStudent.degreePro }}%</td>
              </tr>
              </tbody>
            </table>
            <v-chart :options="option" v-show="index!==null" key="113" style="width: 450px;height: 290px"/>
          </div>
        </div>
        <div class="col-12" v-if="state">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">线上行为检测报告</h5>
              <h6 class="card-subtitle text-muted">本报告包含了本次课程所有学生的线上行为相关信息</h6>
            </div>
            <el-table
                stripe
                :data="onlineBehavior.onlineStudents"
                style="width: 100%;color: #0a0c0d">
              <el-table-column
                  prop="student"
                  label="姓名"
                  width="90">
              </el-table-column>
              <el-table-column label="行为检测相关数据">
                <el-table-column label="次数统计">
                  <el-table-column
                      prop="sleepCount"
                      label="睡觉"
                      width="50">
                  </el-table-column>
                  <el-table-column
                      prop="talkCount"
                      label="说话"
                      width="50">
                  </el-table-column>
                  <el-table-column
                      prop="leaveCount"
                      label="旷课"
                      width="50">
                  </el-table-column>
                  <el-table-column
                      prop="outCount"
                      label="走神"
                      width="50">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="占比统计">
                  <el-table-column
                      prop="sleepPro"
                      sortable
                      label="睡觉"
                      width="80">
                  </el-table-column>
                  <el-table-column
                      prop="talkPro"
                      sortable
                      label="说话"
                      width="80">
                  </el-table-column>
                  <el-table-column
                      prop="leavePro"
                      sortable
                      label="旷课"
                      width="80">
                  </el-table-column>
                  <el-table-column
                      prop="outPro"
                      sortable
                      label="走神"
                      width="80">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="总体评判">
                  <el-table-column
                      prop="studyPro"
                      label="认真度"
                      width="88"
                      sortable
                  >
                  </el-table-column>
                  <el-table-column
                      prop="degreePro"
                      label="参与度"
                      width="88"
                      sortable
                  >
                  </el-table-column>
                </el-table-column>
                <el-table-column
                    prop="postTime"
                    label="最后提交时间"
                    sortable
                    width="155">
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import axios from 'axios'
import {Message} from 'element-ui'

export default {
  components: {
    'v-chart': ECharts
  },
  data () {
    return {
      index: null,
      state: false,
      last: '',
      student: '',
      message: '',
      courseName: '',
      courses: [],
      courseCount: '0',
      onlineBehaviors: [],
      onlineBehavior: {
        'id': '',
        'behaviorStartTime': '',
        'behaviorEndTime': '',
        'lastTime': 0,
        'sleepCount': 0,
        'talkCount': 0,
        'leaveCount': 0,
        'outCount': 0,
        onlineStudents: []
      },
      onlineStudent: {
        'sleepCount': 0,
        'talkCount': 0,
        'leaveCount': 0,
        'outCount': 0,
        'student': '',
        'sleepPro': 0,
        'talkPro': 0,
        'leavePro': 0,
        'outPro': 0,
        'studyPro': 0,
        'degreePro': 0
      },
      behaviorChartData: [
        {value: 0, name: '睡觉次数'},
        {value: 735, name: '说话次数'},
        {value: 580, name: '走神次数'},
        {value: 484, name: '旷课次数'}
      ],
      polar: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          top: 'center',
          right: '10%'
        },
        series: {
          name: '学生总体情况',
          type: 'pie',
          center: ['30 %', 'center'],
          radius: ['50%', '80%'],
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
              fontSize: '25',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: []
        }
      },
      option: {
        grid: {
          top: '35%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          top: '2%',
          left: 'center'
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
            interval: 50,
            splitLine: {show: false},
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
            splitLine: {show: false},
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '次数',
            type: 'bar',
            data: [0, 0, 0, 0]
          },
          {
            name: '占比',
            type: 'line',
            yAxisIndex: 1,
            data: [0, 0, 0, 0]
          }
        ]
      },
      timePolar: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['走神次数', '瞌睡次数', '说话次数', '旷课次数']
        },
        grid: {
          left: '3%',
          right: '8%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          name: '时间',
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: []
      }
    }
  },
  methods: {
    getCourse () {
      let that = this
      axios.get('/teacher/course').then((res) => {
        that.courses = res.data.data
      }).catch((err) => {
        console.log(err)
      })
    },
    getBehaviors: function () {
      let that = this
      axios({
        method: 'get',
        url: '/teacher/online',
        params: {
          courseName: that.courseName
        }
      }).then((res) => {
        if (res.data.success) {
          that.onlineBehaviors = res.data.data
          that.state = false
          that.onlineBehavior = ''
          that.index = null
        } else {
          Message.error(res.data.message)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    updateBehavior () {
      this.state = true
      this.convertLast()
      this.courseCount = this.onlineBehavior.onlineStudents.length
      this.drawBehaviorChart()
      this.drawTimeChart()
      this.index = null
    },
    convertLast () {
      let lt = this.onlineBehavior.lastTime
      let timeMin = 60
      let timeHours = timeMin * 60
      let hours = Math.floor(lt / timeHours)
      let minutes = Math.floor((lt % timeHours) / timeMin)
      this.last = ''
      if (hours !== 0) {
        this.last = hours + '小时'
      }
      this.last += minutes + '分钟'
    },
    updateStudentBehavior () {
      if (this.index === null) {
        return
      }
      this.onlineStudent = this.onlineBehavior.onlineStudents[this.index]
      this.drawStudentChart()
    },
    drawBehaviorChart () {
      this.behaviorChartData[0].value = this.onlineBehavior.sleepCount
      this.behaviorChartData[1].value = this.onlineBehavior.talkCount
      this.behaviorChartData[2].value = this.onlineBehavior.outCount
      this.behaviorChartData[3].value = this.onlineBehavior.leaveCount
      this.polar.series.data = this.behaviorChartData
    },
    drawStudentChart () {
      let barData = []
      barData.push(this.onlineStudent.sleepCount)
      barData.push(this.onlineStudent.talkCount)
      barData.push(this.onlineStudent.outCount)
      barData.push(this.onlineStudent.leaveCount)
      let lineData = []
      lineData.push(this.onlineStudent.sleepPro)
      lineData.push(this.onlineStudent.talkPro)
      lineData.push(this.onlineStudent.outPro)
      lineData.push(this.onlineStudent.leavePro)
      this.option.series[0].data = barData
      this.option.series[1].data = lineData
    },
    drawTimeChart () {
      let that = this
      axios({
        method: 'get',
        url: '/teacher/online/charts',
        params: {
          'behaviorId': that.onlineBehavior.id
        }
      }).then((res) => {
        if (!res.data.success) {
          Message.error(res.data.message)
        }
        let chartData = res.data.data
        let chartDate = []
        let length = chartData[0].data.length
        that.timePolar.series = chartData
        for (let i = 0; i < length; i++) {
          chartDate.push(i * 3 + 'min')
        }
        that.timePolar.xAxis.data = chartDate
        console.log(chartDate)
      }).catch((err) => {
        that.message = err
        console.log(err)
      })
    }
  },
  mounted () {
    this.getCourse()
  }
}
</script>
<style>

</style>
