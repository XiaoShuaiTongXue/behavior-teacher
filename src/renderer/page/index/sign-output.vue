<template>
  <!--签到情况-->
  <div class="content" id="checkinOutputPage">
    <div class="container-fluid p-0">
      <br>
      <br>
      <h1 class="h3 mb-3">课堂签到情况</h1>

      <div class="row">

        <div class="col-12 col-lg-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">签到按钮</h5>
              <h6 class="card-subtitle text-muted">老师将规定具体签到时间，中途无法终止签到。</h6>
            </div>
            <div class="card-body">
<!--              {{courses}}-->
<!--              {{this.getSignDate}}-->
<!--              {{this.getSignDate.courseName}}-->
              <template>
                <el-select v-model="getSignDate.courseName" placeholder="请选择课程" @change="getSignData">
                  <el-option
                          v-for="(course,index) in courses"
                          :key="index"
                          :label="course"
                          :value="course">
                  </el-option>
                </el-select>
              </template>
              <br>
              <br>

<!--              {{signStudents}}-->
              <template>
                <el-select v-model="signStudents" placeholder="请选择查询课程时间"  @change="getSignData">
                  <el-option
                          v-for="signDate in signDates"
                          :key="signDate"
                          :label="signDate.signStartTime"
                          :value="signDate.signStudents">
                  </el-option>
                </el-select>
              </template>
              <br>
              <br>
              <template>
                <el-button
                        plain
                        type="primary"
                        @click="open2">
                  学生状态信息补充
                </el-button>
              </template>
            </div>

          </div>
        </div>

        <div class="col-12 col-xl-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">学生签到名单</h5>
              <h6 class="card-subtitle text-muted">该名单包含对应课程中，所有 <code>学生签到</code>情况。 </h6>
            </div>
            <template>
              <el-table
                      :data="signStudents"
                      style="width: 100%"
                      :default-sort = "{prop: 'date', order: 'descending'}"
                      max-height="350">
                <el-table-column
                        prop="student"
                        label="姓名"
                        width="80%">
                  <template>

                  </template>
                </el-table-column>
                <el-table-column
                        prop="studentId"
                        label="学号"
                        width="170%">
                </el-table-column>
                <el-table-column
                        prop="course_"
                        label="课程"
                        width="80%">
                  <template>
                    {{getSignDate.courseName}}
                  </template>
                </el-table-column>
                <el-table-column
                        prop="signState"
                        fixed="right"
                        label="状态"
                        sortable
                        width="150%">
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>

        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">在这里可以查看本门课程学生的所有签到情况。</h5>
              <h6 class="card-subtitle text-muted"><code></code></h6>
            </div>

            <template>
              <el-table
                      :data="signStudents"
                      style="width: 100%"
                      :default-sort = "{prop: 'date', order: 'descending'}"
              >
                <el-table-column
                        prop="studentId"
                        label="学号"
                        sortable
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="student"
                        label="姓名"
                        sortable
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="course_"
                        label="课程"
                        :formatter="formatter">
                  <template>
                    {{getSignDate.courseName}}
                  </template>
                </el-table-column>
                <el-table-column
                        prop="normal_count"
                        label="正常签到次数"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="late_count"
                        label="迟到次数"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="truancy_count"
                        label="旷课次数"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="vacate_count"
                        label="请假次数"
                        sortable>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import {Notification} from 'element-ui'

  const ipcRenderer = require('electron').ipcRenderer
  export default {
    data () {
      return {
        class_: [],
        courses: [],
        signDates: [],
        options: [
          5, 10, 15, 20, 25, 30
        ],
        getSignDate: [],
        studentData: [],
        course: [],
        signouts: [],
        signout: [],
        signStudents: null,
        courseName: null,
        signlates: [],
        signDate: null,
        courseId: null,
        signTime: null,
        normal_count: [12, 25, 25, 8, 1, 1, 1, 1, 1]
      }
    },
    methods: {
      getInfo () {
        let that = this
        axios.get('/teacher/info').then((res) => {
          console.log(res)
          that.teacher = res.data.data
        }).catch((err) => {
          console.log(err)
        })
        axios.get('/teacher/course').then((res) => {
          console.log(res)
          that.class_ = res.data.data
        }).catch((err) => {
          console.log(err)
        })
      },
      exit () {
        ipcRenderer.send('close')
      },
      updateAvatar () {
        Notification({
          message: '该功能正在抓紧开发中',
          position: 'bottom-right'
        })
      },
      getCourse () {
        let that = this
        axios.get('/teacher/course').then((res) => {
          console.log(res)
          that.courses = res.data.data
        }).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
      },
      getSignData () {
        let that = this
        axios({
          method: 'get',
          url: '/teacher/sign',
          params: {
            courseName: that.getSignDate.courseName
          }
        }).then((res) => {
          console.log(res)
          that.signDates = res.data.data
        }).catch((err) => {
          console.log(err)
        })
      },
      formatter (row, column) {
        return row.address
      },
      open2 () {
        let arr = ['* 旷课： 0 ', '* 迟到： 1', '* 正常签到： 2', '* 请假： 3']
        let str = arr.join(' <br/> ')
        this.$notify.info({
          title: '状态提示',
          dangerouslyUseHTMLString: true,
          message: str,
          duration: 0
        })
      },
      // getSign () {
      //   var vm = this
      //   axios({
      //     method: 'post',
      //     url: '/teacher/sign',
      //     // params: vm.signData
      //     params: {
      //       courseName: '软件工程',
      //       signTime: 1,
      //       truantTime: 2
      //     }
      //   }).then(function (response) {
      //     console.log(response.data)
      //     vm.studentData = response.data.data.signStudents
      //     vm.course = response.data.data.course.courseName
      //     vm.$message({
      //       message: response.data.message,
      //       type: 'success'
      //     })
      //   }).catch(function (error) {
      //     vm.$message({
      //       message: error,
      //       type: 'warning'
      //     })
      //   })
      // },
      signOut () {
        let that = this
        setInterval(() => {
          axios.get('/teacher/sign/out')
            .then((res) => {
              console.log(res)
              if (res.data.code === 2000) { that.signouts = res.data.data }
            })
            .catch((err) => {
              console.log(err)
            })
          axios.get('/teacher/sign/late')
            .then((res) => {
              console.log(res)
              if (res.data.code === 2000) { that.signlates = res.data.data }
            })
            .catch((err) => {
              console.log(err)
            })
        }, 1000)
      }
    },
    mounted () {
      this.getCourse()
    }
  }
</script>
<style>
</style>
