# AI Settings 统一为通用 Settings 接口 - 方案分析

## 当前状态

### 通用 Settings 接口
- **端点**: `GET/PUT/DELETE /api/settings/{key}`
- **数据表**: `Setting` (全局设置)
- **权限**: 仅 Admin
- **存储**: 一个 key = 一个 JSON value

### AI Settings (特殊实现)
- **端点**: `GET/PUT/DELETE /api/settings/ai/config`
- **数据表**: `UserSetting` (用户特定设置)
- **权限**: 认证用户 (每个用户有自己的配置)
- **存储**: 每个用户 4 条记录 (`ai_provider`, `ai_api_key`, `ai_model`, `ai_base_url`)

**关键区别**: AI settings 是**用户级**配置，通用 settings 是**全局**配置。

---

## 可选方案

### 方案 A: 简化 AI Settings 存储 (推荐)

保持现有端点 `/api/settings/ai/config`，但改为单条记录存储：

```typescript
// 改为存储为单条 JSON
{
  key: "ai_config",
  value: {
    provider: "openai",
    apiKey: "sk-xxx",
    model: "gpt-4",
    baseUrl: "https://api.openai.com"
  }
}
```

**改动**:
1. `settings.service.ts`: 简化 `getAiSettings/updateAiSettings/deleteAiSettings`
2. 数据库迁移: 合并现有 4 条记录为 1 条

**优点**: 最小改动，保持用户级配置的语义

---

### 方案 B: 改为全局 Settings

将 AI settings 改为全局配置，使用通用接口：

```
PUT /api/settings/ai_config
{
  "value": {
    "provider": "openai",
    "apiKey": "sk-xxx",
    "model": "gpt-4",
    "baseUrl": "https://api.openai.com"
  }
}
```

**改动**:
1. 删除 `ai/config` 端点
2. 将 `UserSetting` 表的数据迁移到 `Setting` 表
3. OpenAPI 删除 AI 专用端点

**优点**: 统一接口
**缺点**: 失去用户级配置能力（所有用户共用同一 AI 配置）

---

### 方案 C: 通用接口支持用户级设置

扩展通用接口支持用户级查询：

```
GET /api/settings/{key}?userId=123  # 获取指定用户的设置
GET /api/settings/{key}             # 获取全局设置
```

**改动**:
1. 修改 `settings.controller.ts` 支持用户级查询
2. 修改 `settings.service.ts` 同时支持 `Setting` 和 `UserSetting` 表
3. 删除 `ai/config` 专用端点

**优点**: 真正意义上的统一接口
**缺点**: 改动较大，需要修改权限控制逻辑

---

## 需要用户决策的问题

1. **AI settings 是否必须保持用户级？** 还是所有用户共用同一配置也可以？
2. **如果选择方案 A**：是否需要数据库迁移（合并现有 4 条记录）？
3. **如果选择方案 B**：是否接受所有用户共用同一 AI 配置？

---

## 相关文件

- `/home/awayer/Github/Qing/backend/src/modules/settings/settings.controller.ts` (第 49-69 行 AI 端点)
- `/home/awayer/Github/Qing/backend/src/modules/settings/settings.service.ts` (AI 设置逻辑)
- `/home/awayer/Github/Qing/backend/prisma/schema.prisma` (`Setting` 和 `UserSetting` 模型)
- `/home/awayer/Github/Qing/shared/openapi.yaml` (API 文档)
