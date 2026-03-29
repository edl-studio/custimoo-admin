<script setup lang="ts">
  import { ref } from 'vue'
  import { toast } from 'vue-sonner'
  import { PageHeader } from '@/components/admin'
  import { Button } from '@/components/ui/button'
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
  import { Input } from '@/components/ui/input'
  import { Label } from '@/components/ui/label'
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
  } from '@/components/ui/select'
  import { Switch } from '@/components/ui/switch'
  import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

  // General settings
  const siteName = ref('Custimoo Admin')
  const timezone = ref('Europe/Brussels')
  const language = ref('en')

  // Notification settings
  const emailNotifications = ref(true)
  const digestFrequency = ref('weekly')

  // Security settings
  const twoFactorAuth = ref(false)
  const sessionTimeout = ref(30)

  const savingGeneral = ref(false)
  const savingNotifications = ref(false)
  const savingSecurity = ref(false)

  async function saveGeneral() {
    savingGeneral.value = true
    await new Promise(resolve => setTimeout(resolve, 300))
    savingGeneral.value = false
    toast.success('General settings saved')
  }

  async function saveNotifications() {
    savingNotifications.value = true
    await new Promise(resolve => setTimeout(resolve, 300))
    savingNotifications.value = false
    toast.success('Notification preferences saved')
  }

  async function saveSecurity() {
    savingSecurity.value = true
    await new Promise(resolve => setTimeout(resolve, 300))
    savingSecurity.value = false
    toast.success('Security settings saved')
  }
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Settings"
      class="border-0 px-0"
    />

    <Tabs default-value="general">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <!-- General Tab -->
      <TabsContent value="general">
        <Card class="border-[#ECE5DA] shadow-none">
          <CardHeader>
            <CardTitle class="text-[#1D1816]">General Settings</CardTitle>
            <CardDescription class="text-[#726159]">
              Configure basic workspace settings
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-5">
            <div class="space-y-2">
              <Label for="site-name">Site Name</Label>
              <Input id="site-name" v-model="siteName" placeholder="Your site name" />
            </div>

            <div class="space-y-2">
              <Label for="timezone">Timezone</Label>
              <Select v-model="timezone">
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Brussels">Europe/Brussels (CET)</SelectItem>
                  <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                  <SelectItem value="Europe/Paris">Europe/Paris (CET)</SelectItem>
                  <SelectItem value="America/New_York">America/New York (EST)</SelectItem>
                  <SelectItem value="America/Los_Angeles">America/Los Angeles (PST)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="space-y-2">
              <Label for="language">Language</Label>
              <Select v-model="language">
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="nl">Nederlands</SelectItem>
                  <SelectItem value="fr">Fran&ccedil;ais</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="pt-2">
              <Button variant="primary" :disabled="savingGeneral" @click="saveGeneral">
                {{ savingGeneral ? 'Saving...' : 'Save Changes' }}
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- Notifications Tab -->
      <TabsContent value="notifications">
        <Card class="border-[#ECE5DA] shadow-none">
          <CardHeader>
            <CardTitle class="text-[#1D1816]">Notification Preferences</CardTitle>
            <CardDescription class="text-[#726159]">
              Choose how you want to receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="flex items-center justify-between rounded-lg border border-[#ECE5DA] p-4">
              <div>
                <Label class="text-sm font-medium">Email Notifications</Label>
                <p class="text-xs text-[#726159]">Receive email alerts for important updates</p>
              </div>
              <Switch v-model:checked="emailNotifications" />
            </div>

            <div class="space-y-3">
              <Label>Digest Frequency</Label>
              <RadioGroup v-model="digestFrequency">
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="daily" value="daily" />
                  <Label for="daily" class="font-normal"> Daily </Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="weekly" value="weekly" />
                  <Label for="weekly" class="font-normal"> Weekly </Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="monthly" value="monthly" />
                  <Label for="monthly" class="font-normal"> Monthly </Label>
                </div>
              </RadioGroup>
            </div>

            <div class="pt-2">
              <Button variant="primary" :disabled="savingNotifications" @click="saveNotifications">
                {{ savingNotifications ? 'Saving...' : 'Save Changes' }}
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- Security Tab -->
      <TabsContent value="security">
        <Card class="border-[#ECE5DA] shadow-none">
          <CardHeader>
            <CardTitle class="text-[#1D1816]">Security Settings</CardTitle>
            <CardDescription class="text-[#726159]">
              Manage authentication and session settings
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="flex items-center justify-between rounded-lg border border-[#ECE5DA] p-4">
              <div>
                <Label class="text-sm font-medium">Two-Factor Authentication</Label>
                <p class="text-xs text-[#726159]">Add an extra layer of security to your account</p>
              </div>
              <Switch v-model:checked="twoFactorAuth" />
            </div>

            <div class="space-y-2">
              <Label for="session-timeout">Session Timeout (minutes)</Label>
              <Input
                id="session-timeout"
                v-model.number="sessionTimeout"
                type="number"
                min="5"
                max="480"
                class="max-w-[200px]"
              />
              <p class="text-xs text-[#726159]">
                Automatically log out after this period of inactivity
              </p>
            </div>

            <div class="pt-2">
              <Button variant="primary" :disabled="savingSecurity" @click="saveSecurity">
                {{ savingSecurity ? 'Saving...' : 'Save Changes' }}
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
