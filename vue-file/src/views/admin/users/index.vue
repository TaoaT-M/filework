<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
<!--      s_id='8000116342', s_pwd='123456', s_name='张三', s_sex='男', s_tel='13361616161', s_position='学生', s_class='1611'-->
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="用户姓名" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.s_id }}
        </template>
      </el-table-column>
      <el-table-column label="用户密码" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.s_pwd }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户性别" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.s_sex }}
        </template>
      </el-table-column>
      <el-table-column label="用户电话" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.s_tel }}
        </template>
      </el-table-column>
      <el-table-column label="用户职位" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.s_position }}
        </template>
      </el-table-column>
      <el-table-column label="用户姓名" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.s_name }}
        </template>
      </el-table-column>


    </el-table>
  </div>
</template>

<script>
import { getStudents } from '@/api/admin/user'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getStudents().then(response => {
        //由于request.js中有前置拦截器所以我们接受到的就是response.data 我们可以直接取其中的items
        this.list = response.items
        this.listLoading = false
      })
    }
  }
}
</script>
