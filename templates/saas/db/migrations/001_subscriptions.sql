-- AgentReady Pro subscriptions table
-- Run in Supabase SQL editor: Dashboard → SQL Editor → New query

create table if not exists public.subscriptions (
  id                      uuid primary key default gen_random_uuid(),
  user_id                 uuid references auth.users(id) on delete cascade not null,
  stripe_customer_id      text unique not null,
  stripe_subscription_id  text unique,
  stripe_price_id         text,
  status                  text not null default 'inactive',
    -- values: 'active' | 'trialing' | 'past_due' | 'canceled' | 'inactive'
  current_period_end      timestamptz,
  cancel_at_period_end    boolean not null default false,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

create index if not exists subscriptions_user_id_idx on public.subscriptions(user_id);

alter table public.subscriptions enable row level security;

create policy "Users can view own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Webhooks use the service role key which bypasses RLS entirely
