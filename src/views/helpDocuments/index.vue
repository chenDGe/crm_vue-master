<template>
  <div class="help_documents m98Auto paddingTB15">
    <el-tabs type="border-card">
      <el-tab-pane label="文档分类">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>
              <el-button
                type="text"
                size="mini"
                class="paddingLeft15"
                @click="() => append(data)"
              >
                新增
              </el-button>
              <el-button
                type="text"
                size="mini"
                class=""
                @click="() => append(data)"
              >
                编辑
              </el-button>
              <el-button
                type="text"
                size="mini"
                class="colorRed"
                @click="() => remove(node, data)"
              >
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </el-tab-pane>
      <el-tab-pane label="帮助文档列表">
        <div class="pro_top_button">
          <el-button type="success" icon="el-icon-plus" size="small" @click="newDoc('新增')">新增</el-button>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%;"
        >
          <el-table-column
            prop="id"
            label="ID"
            width="80"
            align="center"
          />
          <el-table-column
            prop="name"
            label="名称"
            align="center"
          />
          <el-table-column
            prop="name"
            label="所属分类"
            align="center"
          />
          <el-table-column
            prop="address"
            label="操作"
            width="180"
            align="center"
          >
            <template :slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="newDoc('编辑')">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pro_top_pagination">
          <el-pagination
            background
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          />
        </div>
        <!--  弹框-->
        <el-dialog :title="`${dialogTitle}`+ '文档'" width="1000px" :visible.sync="dialogFormVisible">
          <el-form :label-width="formLabelWidth">
            <el-form-item label="名称">
              <el-cascader
                v-model="value"
                :options="options"
                @change="handleChange"
              />
            </el-form-item>
            <el-form-item label="标题">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="优先级">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item>
              <quill-editor
                ref="myTextEditor"
                v-model="content"
                class="editor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
                @change="onEditorChange($event)"
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="录音文件列表">
        <div class="pro_top_button">
          <el-button type="success" icon="el-icon-plus" size="small" @click="newHelpSound('新增')">新增</el-button>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%;"
        >
          <el-table-column
            prop="id"
            label="ID"
            width="80"
            align="center"
          />
          <el-table-column
            prop="name"
            label="标题"
            align="center"
          />
          <el-table-column
            prop="name"
            label="品牌"
            align="center"
          />
          <el-table-column
            prop="name"
            label="优先级"
            align="center"
          />
          <el-table-column
            prop="name"
            label="录音文件名"
            align="center"
          />
          <el-table-column
            prop="name"
            label="描述"
            align="center"
          />
          <el-table-column
            prop="address"
            label="操作"
            width="180"
            align="center"
          >
            <template :slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="newHelpSound('编辑')">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pro_top_pagination">
          <el-pagination
            background
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          />
        </div>
        <!--  弹框-->
        <el-dialog :title="`${soundDialogTitle}`+ '录音文件'" width="500px" :visible.sync="soundDialogFormVisible">
          <el-form :label-width="formLabelWidth">
            <el-form-item label="标题">
              <el-cascader
                v-model="value"
                :options="options"
                @change="handleChange"
              />
            </el-form-item>
            <el-form-item label="优先级">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="所属项目">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="上传录音文件">
              <el-upload
                ref="upload"
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="描述">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="textarea">
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
let id = 1000
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
export default {
  name: 'Index',
  data() {
    const data = [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }]
    return {
      data: JSON.parse(JSON.stringify(data)),
      value: [],
      options: [{
        value: 'data',
        label: 'Data',
        children: [{
          value: 'table',
          label: 'Table 表格'
        }, {
          value: 'tag',
          label: 'Tag 标签'
        }, {
          value: 'progress',
          label: 'Progress 进度条'
        }, {
          value: 'tree',
          label: 'Tree 树形控件'
        }, {
          value: 'pagination',
          label: 'Pagination 分页'
        }, {
          value: 'badge',
          label: 'Badge 标记'
        }]
      }],
      tableData: [{
        id: '1',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      form: [],
      formLabelWidth: '120px',
      dialogFormVisible: false,
      dialogTitle: '' || '新增',
      content: null,
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
            ['blockquote', 'code-block'], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
            [{ script: 'sub' }, { script: 'super' }], // 上标/下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            // [{'direction': 'rtl'}],                         // 文本方向
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ font: [] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ['clean'], // 清除文本格式
            ['link', 'image', 'video'] // 链接、图片、视频
          ] // 工具菜单栏配置
        },
        placeholder: '请在这里添加文档描述', // 提示
        readyOnly: false, // 是否只读
        theme: 'snow', // 主题 snow/bubble
        syntax: true // 语法检测
      },
      soundDialogTitle: '' || '新增',
      soundDialogFormVisible: false,
      textarea: '',
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]

    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor
    }
  },
  mounted() {
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },

    newDoc(title) {
      this.dialogTitle = title
      this.dialogFormVisible = true
    },

    handleChange(value) {
      console.log(value)
    },

    newHelpSound(title) {
      this.soundDialogTitle = title
      this.soundDialogFormVisible = true
    },

    // 失去焦点
    onEditorBlur(editor) {},
    // 获得焦点
    onEditorFocus(editor) {},
    // 开始
    onEditorReady(editor) {},
    // 值发生变化
    onEditorChange(editor) {
      this.content = editor.html
      console.log(editor)
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
}
</script>

<style scoped>

</style>
