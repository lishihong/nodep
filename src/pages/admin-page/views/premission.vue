<template>
  <div>
    <el-button>新增</el-button>
    <el-button>修改</el-button>
    <el-button>删除</el-button>
    <el-table
      border
      size="mini"
      style="width: 100%;margin-top:20px;"
    >
      <el-table-column
        prop="name"
        label="用户名"
        :resizable="false"
      />
      <el-table-column
        prop="name"
        label="性别"
        :resizable="false"
      />
      <el-table-column
        prop="cols"
        label="状态"
        :resizable="false"
      />
      <el-table-column
        prop="rows"
        label="创建时间"
        :resizable="false"
      />
      <el-table-column
        prop="create_time"
        label="修改时间"
        :resizable="false"
      />
    </el-table>
  </div>
</template>

<script>
export default{
    data() {
        return {
            
        }
    },
    mounted() {
      
    },
    methods: {
        
    },      
}
</script>

<style scoped lang="less">

</style>

<style lang="less">
  
</style>
