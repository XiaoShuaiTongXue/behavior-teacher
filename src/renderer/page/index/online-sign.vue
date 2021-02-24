<template>
  <!--线上签到-->
  <div class="content" id="online_checkinPage">
    <div class="container-fluid p-0">
      <br>
      <br>
      <h1 class="h3 mb-3">线上课堂点名</h1>

      <div class="row">
        <div class="col-12 col-lg-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">签到按钮</h5>
              <h6 class="card-subtitle text-muted">老师将规定具体签到时间，中途无法终止签到。</h6>
            </div>
            <div class="card-body">
                <template>
                  <el-select v-model="signData.courseName" placeholder="请选择课程" @click="getCourse">
                    <el-option
                            v-for="(course,index) in courses"
                            :key="index"
                            :label="course"
                            :value="course">
                    </el-option>
                  </el-select>
                </template>
              <br><br>
              <template>
                <el-select v-model="signData.signTime" placeholder="请选择签到时长(min)">
                  <el-option
                          v-for="item in options"
                          :key="item"
                          :label="item"
                          :value="item">
                  </el-option>
                </el-select>
              </template>

              <div class="card-body text-center">
                <div class="mb-3">
                  <button class="btn btn-pill btn-primary" @click="getSign(), signOut()">开始签到</button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="col-12 col-xl-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">学生名单</h5>
              <h6 class="card-subtitle text-muted">自动获取所选课程的学生相关信息。</h6>
            </div>
            <template>
              <el-table
                      @selection-change="getRowDatas"
                      :data="studentData"
                      style="width: 100%"
                      max-height="250">
                <el-table-column
                        prop="student"
                        label="姓名"
                        width="80%">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="学号"
                        width="180%">
                </el-table-column>
                <el-table-column
                        prop="course_"
                        label="课程"
                        width="80%">
                  <template>
                    {{course}}
                  </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100%">
                  <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="deleteRow(scope.$index, studentData)"
                            type="danger"
                            size="mini">
                      移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>


          </div>
        </div>

        <div class="col-12 col-xl-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">未签到学生名单</h5>
              <h6 class="card-subtitle text-muted">没有按时签到的学生，造成 <code>旷课行为</code>。 </h6>
            </div>
            <template>
              <el-table
                      :data="signouts"
                      style="width: 100%"
                      max-height="250">
                <el-table-column
                        prop="student"
                        label="姓名"
                        width="80%">
                  <template>

                  </template>
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="学号"
                        width="170%">
                </el-table-column>
                <el-table-column
                        prop="course_"
                        label="课程"
                        width="80%">
                  <template>
                    {{course}}
                  </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="150%">
                  <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="info"
                            @click.native.prevent="getData_3(scope.row)">事假</el-button>
                    <el-button
                            @click.native.prevent="getData_2(scope.row)"
                            type="success"
                            size="mini">
                      代签
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>

        <div class="col-12 col-xl-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">迟到名单</h5>
              <h6 class="card-subtitle text-muted">在正式上课15分钟内依旧没有签到成功， <code>系统自动判定旷课</code> 。</h6>
            </div>
            <template>
              <el-table
                      :data="signlates"
                      style="width: 100%"
                      max-height="250">
                <el-table-column
                        prop="student"
                        label="姓名"
                        width="80%">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="学号"
                        width="170%">
                </el-table-column>
                <el-table-column
                        prop="course_"
                        label="课程"
                        width="80%">
                  <template>
                    {{course}}
                  </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="150%">
                  <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="info"
                            @click.native.prevent="getData_3(scope.row)">事假</el-button>
                    <el-button
                            @click.native.prevent="getData_2(scope.row)"
                            type="success"
                            size="mini">
                      代签
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>

        <div class="modal fade" id="defaultModalPrimary" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">修改签到情况</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body m-3">
                <p class="mb-0">
                  学生：{{ messeage }}，学号：{{ message }}，因不可控因素，如断网断电、事假等造成无法按时签到，请及时联系老师修改签到情况。</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary">修改为正常签到</button>
                <button type="button" class="btn btn-success">修改为事假</button>
              </div>
            </div>
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
        teacher: {
          name: '',
          sex: '',
          teacherNumber: '',
          avatar: ''
        },
        class_: [],
        courses: [],
        options: [
          5, 10, 15, 20, 25, 30
        ],
        signData: {
          courseName: '',
          signTime: null,
          truantTime: 15
        },
        studentData: [],
        course: [],
        signouts: [],
        signout: [],
        signStudents: null,
        courseName: null,
        signlates: []
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
        }).catch((err) => {
          console.log(err)
        })
      },
      getSign () {
        var vm = this
        axios({
          method: 'post',
          url: '/teacher/sign',
          params: vm.signData
        }).then(function (response) {
          console.log(response.data)
          vm.$message({
            message: response.data.message,
            type: 'success'
          })
          vm.studentData = response.data.data.signStudents
          vm.course = response.data.data.course.courseName
        })
        //         .catch(function (error) {
        //   // vm.$message({
        //   //   message: error,
        //   //   type: 'warning'
        //   // })
        // })
      },
      deleteRow (index, rows) {
        rows.splice(index, 1)
      },
      getData_3: function (row) {
        var vm = this
        axios({
          method: 'post',
          url: '/teacher/update/sigin',
          // params: vm.signData
          params: {
            signID: row.id,
            state: 3
          }
        }).then(function (response) {
          vm.$message({
            message: response.data.message,
            type: 'success'
          })
        }).catch(function (error) {
          vm.$message({
            message: error,
            type: 'warning'
          })
        })
      },
      getData_2: function (row) {
        var vm = this
        axios({
          method: 'post',
          url: '/teacher/update/sigin',
          // params: vm.signData
          params: {
            signID: row.id,
            state: 2
          }
        }).then(function (response) {
          vm.$message({
            message: response.data.message,
            type: 'success'
          })
        }).catch(function (error) {
          vm.$message({
            message: error,
            type: 'warning'
          })
        })
      },
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
