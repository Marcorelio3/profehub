'use client';

export const dynamic = 'force-dynamic';

import { motion } from 'framer-motion';

import { Header } from '@/components/layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bell,
  Camera,
  Globe,
  Key,
  Monitor,
  Moon,
  Palette,
  Save,
  Shield,
  Sun,
  Trash2,
  User,
  X,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { setTheme } = useTheme();
  const [activeTab, setActiveTab] = React.useState<string>('perfil');
  const [isSaving, setIsSaving] = React.useState(false);

  const [profile, setProfile] = React.useState({
    name: 'João Silva',
    email: 'joao.silva@escola.edu.br',
    bio: 'Professor de Matemática e Física há 10 anos. Apaixonado por educação e tecnologia.',
    subject: 'Matemática',
    grade: '9º Ano',
    school: 'Escola Municipal João XXIII',
    location: 'São Paulo, SP',
    website: 'https://joaosilva.dev',
    avatarUrl: '',
  });

  const [notifications, setNotifications] = React.useState({
    emailActivity: true,
    emailComments: true,
    emailForks: true,
    emailDownloads: true,
    emailWeeklyDigest: false,
    pushActivity: true,
    pushComments: true,
    pushMentions: true,
  });

  const [privacy, setPrivacy] = React.useState({
    profileVisibility: 'public',
    activityVisibility: 'public',
    showEmail: false,
    showStats: true,
    allowMessages: 'followers',
    searchEngineIndexing: true,
  });

  const [appearance, setAppearance] = React.useState({
    theme: 'system',
    compactMode: false,
    animations: true,
    highContrast: false,
  });

  const [security, _setSecurity] = React.useState({
    twoFactorEnabled: false,
    passwordLastChanged: '2024-01-15',
    activeSessions: 3,
  });

  const handleSave = async (section: string) => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success(`${section} salvo com sucesso!`);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile((prev) => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-6 lg:py-8">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
              <p className="text-muted-foreground mt-1">
                Gerencie sua conta, preferências e privacidade.
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-6">
                <TabsTrigger value="perfil">
                  <User className="h-4 w-4 mr-2" /> Perfil
                </TabsTrigger>
                <TabsTrigger value="notificacoes">
                  <Bell className="h-4 w-4 mr-2" /> Notificações
                </TabsTrigger>
                <TabsTrigger value="privacidade">
                  <Shield className="h-4 w-4 mr-2" /> Privacidade
                </TabsTrigger>
                <TabsTrigger value="aparencia">
                  <Palette className="h-4 w-4 mr-2" /> Aparência
                </TabsTrigger>
                <TabsTrigger value="seguranca">
                  <Key className="h-4 w-4 mr-2" /> Segurança
                </TabsTrigger>
                <TabsTrigger value="conta">
                  <Globe className="h-4 w-4 mr-2" /> Conta
                </TabsTrigger>
              </TabsList>

              <TabsContent value="perfil" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" /> Perfil Público
                    </CardTitle>
                    <CardDescription>
                      Informações visíveis para outros professores na plataforma.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                        <AvatarFallback name={profile.name} />
                      </Avatar>
                      <div className="flex-1">
                        <Label htmlFor="avatar">Foto do perfil</Label>
                        <input
                          id="avatar"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById('avatar')?.click()}
                          className="gap-2"
                        >
                          <Camera className="h-4 w-4" />
                          Alterar foto
                        </Button>
                        {profile.avatarUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setProfile((p) => ({ ...p, avatarUrl: '' }))}
                            className="ml-2 text-destructive"
                          >
                            <X className="h-4 w-4 mr-1" /> Remover
                          </Button>
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome completo *</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                        placeholder="Conte um pouco sobre você..."
                        className="w-full min-h-[100px] p-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-y text-sm"
                        maxLength={500}
                      />
                      <p className="text-xs text-muted-foreground text-right">
                        {profile.bio.length}/500
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="subject">Disciplina principal</Label>
                        <Select
                          value={profile.subject}
                          onValueChange={(v) => setProfile((p) => ({ ...p, subject: v }))}
                        >
                          <SelectTrigger id="subject">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Matemática">Matemática</SelectItem>
                            <SelectItem value="Português">Português</SelectItem>
                            <SelectItem value="História">História</SelectItem>
                            <SelectItem value="Geografia">Geografia</SelectItem>
                            <SelectItem value="Ciências">Ciências</SelectItem>
                            <SelectItem value="Biologia">Biologia</SelectItem>
                            <SelectItem value="Física">Física</SelectItem>
                            <SelectItem value="Química">Química</SelectItem>
                            <SelectItem value="Inglês">Inglês</SelectItem>
                            <SelectItem value="Espanhol">Espanhol</SelectItem>
                            <SelectItem value="Arte">Arte</SelectItem>
                            <SelectItem value="Educação Física">Educação Física</SelectItem>
                            <SelectItem value="Filosofia">Filosofia</SelectItem>
                            <SelectItem value="Sociologia">Sociologia</SelectItem>
                            <SelectItem value="Outros">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="grade">Série/Ano principal</Label>
                        <Select
                          value={profile.grade}
                          onValueChange={(v) => setProfile((p) => ({ ...p, grade: v }))}
                        >
                          <SelectTrigger id="grade">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              '1º Ano',
                              '2º Ano',
                              '3º Ano',
                              '4º Ano',
                              '5º Ano',
                              '6º Ano',
                              '7º Ano',
                              '8º Ano',
                              '9º Ano',
                              '1º Série EM',
                              '2º Série EM',
                              '3º Série EM',
                              'Ensino Superior',
                            ].map((g) => (
                              <SelectItem key={g} value={g}>
                                {g}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="school">Instituição</Label>
                        <Input
                          id="school"
                          value={profile.school}
                          onChange={(e) => setProfile((p) => ({ ...p, school: e.target.value }))}
                          placeholder="Nome da escola/universidade"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Localização</Label>
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))}
                          placeholder="Cidade, Estado"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Site/Portfólio</Label>
                      <Input
                        id="website"
                        type="url"
                        value={profile.website}
                        onChange={(e) => setProfile((p) => ({ ...p, website: e.target.value }))}
                        placeholder="https://seusite.com"
                      />
                    </div>

                    <Button
                      onClick={() => handleSave('Perfil')}
                      disabled={isSaving}
                      className="w-full sm:w-auto"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? 'Salvando...' : 'Salvar alterações'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notificacoes" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" /> Preferências de Notificação
                    </CardTitle>
                    <CardDescription>
                      Configure como e quando você deseja ser notificado.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Email</h3>
                      <div className="space-y-3">
                        {[
                          {
                            key: 'emailActivity',
                            label: 'Nova atividade publicada na biblioteca',
                            desc: 'Receba email quando houver novidades nas suas áreas de interesse',
                          },
                          {
                            key: 'emailComments',
                            label: 'Comentários nas suas atividades',
                            desc: 'Alguém comentou em uma atividade sua',
                          },
                          {
                            key: 'emailForks',
                            label: 'Derivações (forks) das suas atividades',
                            desc: 'Outro professor criou uma derivação do seu material',
                          },
                          {
                            key: 'emailDownloads',
                            label: 'Downloads das suas atividades',
                            desc: 'Resumo semanal de quantas vezes suas atividades foram baixadas',
                          },
                          {
                            key: 'emailWeeklyDigest',
                            label: 'Resumo semanal',
                            desc: 'As melhores atividades da semana na sua área',
                          },
                        ].map((n) => (
                          <Label
                            key={n.key}
                            className="flex items-center justify-between cursor-pointer"
                          >
                            <div>
                              <p className="font-medium">{n.label}</p>
                              <p className="text-sm text-muted-foreground">{n.desc}</p>
                            </div>
                            <Switch
                              checked={notifications[n.key as keyof typeof notifications]}
                              onCheckedChange={(c: boolean) =>
                                setNotifications((p) => ({ ...p, [n.key]: c }))
                              }
                            />
                          </Label>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-4">Push (Navegador)</h3>
                      <div className="space-y-3">
                        {[
                          {
                            key: 'pushActivity',
                            label: 'Atividades recomendadas',
                            desc: 'Sugestões personalizadas baseadas no seu perfil',
                          },
                          {
                            key: 'pushComments',
                            label: 'Respostas aos seus comentários',
                            desc: 'Quando alguém responder a um comentário seu',
                          },
                          {
                            key: 'pushMentions',
                            label: 'Menções (@seuusuario)',
                            desc: 'Quando outro professor mencionar você',
                          },
                        ].map((n) => (
                          <Label
                            key={n.key}
                            className="flex items-center justify-between cursor-pointer"
                          >
                            <div>
                              <p className="font-medium">{n.label}</p>
                              <p className="text-sm text-muted-foreground">{n.desc}</p>
                            </div>
                            <Switch
                              checked={notifications[n.key as keyof typeof notifications]}
                              onCheckedChange={(c: boolean) =>
                                setNotifications((p) => ({ ...p, [n.key]: c }))
                              }
                            />
                          </Label>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => handleSave('Notificações')}
                      disabled={isSaving}
                      className="w-full sm:w-auto"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? 'Salvando...' : 'Salvar preferências'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacidade" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" /> Privacidade e Visibilidade
                    </CardTitle>
                    <CardDescription>
                      Controle quem pode ver suas informações e atividades.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Visibilidade do perfil</Label>
                        <Select
                          value={privacy.profileVisibility}
                          onValueChange={(v) => setPrivacy((p) => ({ ...p, profileVisibility: v }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Público - Qualquer um pode ver</SelectItem>
                            <SelectItem value="teachers">Apenas professores verificados</SelectItem>
                            <SelectItem value="private">Privado - Apenas você</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Visibilidade padrão das atividades</Label>
                        <Select
                          value={privacy.activityVisibility}
                          onValueChange={(v) =>
                            setPrivacy((p) => ({ ...p, activityVisibility: v }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Pública - Aparece na biblioteca</SelectItem>
                            <SelectItem value="unlisted">
                              Não listada - Quem tem o link acessa
                            </SelectItem>
                            <SelectItem value="private">Privada - Apenas você</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Quem pode te enviar mensagens</Label>
                        <Select
                          value={privacy.allowMessages}
                          onValueChange={(v) => setPrivacy((p) => ({ ...p, allowMessages: v }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="everyone">Todos</SelectItem>
                            <SelectItem value="followers">Apenas quem você segue</SelectItem>
                            <SelectItem value="none">Ninguém</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <Label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <p className="font-medium">Mostrar email no perfil público</p>
                          <p className="text-sm text-muted-foreground">
                            Seu email será visível para outros professores
                          </p>
                        </div>
                        <Switch
                          checked={privacy.showEmail}
                          onCheckedChange={(checked) =>
                            setPrivacy((p) => ({ ...p, showEmail: checked }))
                          }
                        />
                      </Label>

                      <Label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <p className="font-medium">Mostrar estatísticas no perfil</p>
                          <p className="text-sm text-muted-foreground">
                            Total de visualizações, downloads e derivações
                          </p>
                        </div>
                        <Switch
                          checked={privacy.showStats}
                          onCheckedChange={(checked) =>
                            setPrivacy((p) => ({ ...p, showStats: checked }))
                          }
                        />
                      </Label>

                      <Label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <p className="font-medium">Indexação em mecanismos de busca</p>
                          <p className="text-sm text-muted-foreground">
                            Permitir que Google e outros indexem seu perfil e atividades públicas
                          </p>
                        </div>
                        <Switch
                          checked={privacy.searchEngineIndexing}
                          onCheckedChange={(checked) =>
                            setPrivacy((p) => ({ ...p, searchEngineIndexing: checked }))
                          }
                        />
                      </Label>
                    </div>

                    <Button
                      onClick={() => handleSave('Privacidade')}
                      disabled={isSaving}
                      className="w-full sm:w-auto"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? 'Salvando...' : 'Salvar configurações'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="aparencia" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" /> Aparência e Interface
                    </CardTitle>
                    <CardDescription>
                      Personalize como o ProfeLab aparece para você.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Tema</Label>
                      <Select
                        value={appearance.theme}
                        onValueChange={(v) => {
                          setAppearance((p) => ({ ...p, theme: v }));
                          setTheme(v);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">
                            <Sun className="h-4 w-4 mr-2" /> Claro
                          </SelectItem>
                          <SelectItem value="dark">
                            <Moon className="h-4 w-4 mr-2" /> Escuro
                          </SelectItem>
                          <SelectItem value="system">
                            <Monitor className="h-4 w-4 mr-2" /> Sistema
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <Label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <p className="font-medium">Modo compacto</p>
                          <p className="text-sm text-muted-foreground">
                            Reduz espaçamentos para ver mais conteúdo na tela
                          </p>
                        </div>
                        <Switch
                          checked={appearance.compactMode}
                          onCheckedChange={(c) => setAppearance((p) => ({ ...p, compactMode: c }))}
                        />
                      </Label>

                      <Label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <p className="font-medium">Animações</p>
                          <p className="text-sm text-muted-foreground">
                            Ativar transições e animações suaves na interface
                          </p>
                        </div>
                        <Switch
                          checked={appearance.animations}
                          onCheckedChange={(c) => setAppearance((p) => ({ ...p, animations: c }))}
                        />
                      </Label>

                      <Label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <p className="font-medium">Alto contraste</p>
                          <p className="text-sm text-muted-foreground">
                            Melhora legibilidade para necessidades de acessibilidade visual
                          </p>
                        </div>
                        <Switch
                          checked={appearance.highContrast}
                          onCheckedChange={(c) => setAppearance((p) => ({ ...p, highContrast: c }))}
                        />
                      </Label>
                    </div>

                    <Button
                      onClick={() => handleSave('Aparência')}
                      disabled={isSaving}
                      className="w-full sm:w-auto"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? 'Salvando...' : 'Salvar preferências'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="seguranca" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5" /> Segurança da Conta
                    </CardTitle>
                    <CardDescription>
                      Gerencie senha, autenticação de dois fatores e sessões ativas.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Autenticação de dois fatores (2FA)</p>
                          <p className="text-sm text-muted-foreground">
                            Adicione uma camada extra de segurança à sua conta
                          </p>
                        </div>
                        <Button
                          variant={security.twoFactorEnabled ? 'default' : 'outline'}
                          onClick={() => alert('2FA - Em desenvolvimento')}
                        >
                          {security.twoFactorEnabled ? 'Ativado' : 'Ativar 2FA'}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Alterar senha</p>
                          <p className="text-sm text-muted-foreground">
                            Última alteração: {security.passwordLastChanged}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => alert('Alterar senha - Em desenvolvimento')}
                        >
                          Alterar
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-4">
                        Sessões Ativas ({security.activeSessions})
                      </h3>
                      <div className="space-y-3">
                        {[
                          {
                            device: 'Chrome no Windows',
                            location: 'São Paulo, BR',
                            current: true,
                            lastActive: 'Agora mesmo',
                          },
                          {
                            device: 'Firefox no Linux',
                            location: 'São Paulo, BR',
                            current: false,
                            lastActive: '2 horas atrás',
                          },
                          {
                            device: 'Safari no iPhone',
                            location: 'Rio de Janeiro, BR',
                            current: false,
                            lastActive: '1 dia atrás',
                          },
                        ].map((session, _i) => (
                          <div
                            key={`session-${session.device}-${session.location}`}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Monitor className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium flex items-center gap-2">
                                  {session.device}
                                  {session.current && (
                                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                      Atual
                                    </span>
                                  )}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {session.location} • {session.lastActive}
                                </p>
                              </div>
                            </div>
                            {!session.current && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => alert('Encerrar sessão - Em desenvolvimento')}
                              >
                                Encerrar
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() =>
                          alert('Encerrar todas as outras sessões - Em desenvolvimento')
                        }
                        className="w-full sm:w-auto mt-4"
                      >
                        Encerrar todas as outras sessões
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="conta" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" /> Gerenciar Conta
                    </CardTitle>
                    <CardDescription>Configurações de conta, dados e exclusão.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Exportar seus dados</h3>
                      <p className="text-sm text-muted-foreground">
                        Baixe uma cópia de todos os seus dados (atividades, perfil, configurações)
                        em formato JSON.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => alert('Exportar dados - Em desenvolvimento')}
                        className="gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Exportar dados (JSON)
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium text-destructive">Zona de perigo</h3>
                      <p className="text-sm text-muted-foreground">
                        Ações irreversíveis. Tenha certeza antes de prosseguir.
                      </p>

                      <div className="flex items-center justify-between p-4 border border-destructive/50 rounded-lg bg-destructive/5">
                        <div>
                          <p className="font-medium text-destructive">
                            Excluir conta permanentemente
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Isso removerá seu perfil, todas as suas atividades, comentários e dados.
                            Esta ação não pode ser desfeita.
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            if (confirm('TEM CERTEZA? Esta ação é irreversível!'))
                              alert('Excluir conta - Em desenvolvimento');
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir conta
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

import { Download } from 'lucide-react';
