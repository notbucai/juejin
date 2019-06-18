<template>
  <div class="comment-lsit">
    <Comment
      @like="handleLike"
      @reply="handleReply(item)"
      v-for="item in comments"
      :key="item._id"
      v-bind="item"
    >
      <EditInput
        slot="edit"
        :isyes="currentComment && currentComment._id == item._id"
        @btnClick="(content,cb)=>{handleSubmit({content, comment:item},cb)}"
        @blur="handleReply(null)"
      />

      <Comment
        slot="comment"
        @like="handleLike"
        @reply="handleReply(_item)"
        v-for="_item in item.two_comments"
        :key="_item._id"
        v-bind="_item"
      >
        <EditInput
          slot="edit"
          :isyes="currentComment && currentComment._id == _item._id"
          @btnClick="(content,cb)=>{handleSubmit({content, comment:_item},cb)}"
          @blur="handleReply(null)"
        />
      </Comment>
    </Comment>
  </div>
</template>

<script>
import Comment from "@/components/common/listItem/CommentItem";
import EditInput from "@/components/post/EditInput";
export default {
  props: {
    comments: Array
  },
  components: {
    Comment,
    EditInput
  },
  data() {
    return {
      currentComment: null
    };
  },
  mounted() {
    console.log(this.comments);
  },
  methods: {
    handleLike() {
      console.log("handleLike");
    },
    handleReply(comment) {
      this.currentComment = comment;
    },
    handleSubmit({ content, comment }, cb) {
      if (!content || content.length > 280) {
        // 错误提示
      } else {
        // cb(1); // cb(0) 表示成功 其他表示失败
        this.$emit("submit", content, cb, comment);
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.comment-lsit {
  padding-left: 50px;
  margin-top: 15px;
}
</style>
